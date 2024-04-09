import { Injectable } from "@nestjs/common";
import { CommonUtils } from "../../Common/Utils/CommonUtils";
import { A_MINUTES_MILLSECOND } from "../../Common/Constant";
import { UserBalanceInfo } from "../../Model/UserBalanceInfo.model";
import { Op, where } from "sequelize";
import { formatUnits, getBalance } from "../contract/erc20.service";
import { logDebug, logError, logInfo } from "../../Common/Utils/LogUtils";

@Injectable()
export class TaskPullUserBalanceService {
  constructor() {
    this.taskStart();
  }

  async taskStart() {
    while (true) {
      logDebug("[TaskPullUserBalanceService] start");
      try {
        await this.pullAllUserBalance();
        logDebug("[TaskPullUserBalanceService] finish");
      } catch (ex) {
       logError("TaskPullUserBalanceService has error", ex);
      } finally {
        await CommonUtils.sleep(5 * A_MINUTES_MILLSECOND);
      }
    }
  }

  /**
   * pull all user balance
   */
  async pullAllUserBalance() {
    let batchSize = 200; // 每次查询的批次大小
    let currentId = BigInt(-1); // 当前查询的 id 值
    let handledCount = 0; //已处理的记录数
    while (true) {
      logInfo(`[pullAllUserBalance] currentId:${currentId} batchSize:${batchSize}`);
      // 查询 batchSize 条 id 大于当前 id 值的数据
      let accountRows: UserBalanceInfo[] = await UserBalanceInfo.findAll({ where: { id: { [Op.gt]: currentId } }, order: [["id", "ASC"]], limit: batchSize });
      if (accountRows.length === 0) break;

      //查询这些地址的代币余额  TODO 可以改成中间合约批量查询多个地址
      for (let row of accountRows) {
        currentId = row.id > currentId ? row.id : currentId;
        const balance = await getBalance(row.tokenAddress, row.userAddress);
        const balanceFormat = await formatUnits(row.tokenAddress, balance);
        await UserBalanceInfo.update({ balance: balanceFormat, updatedAt: new Date() }, { where: { id: row.id } });
      }
      handledCount += accountRows.length;
      logDebug(`[pullAllUsersSunToken]. handledCount:${handledCount}`);

      await CommonUtils.sleep(5);
    }
  }
}
