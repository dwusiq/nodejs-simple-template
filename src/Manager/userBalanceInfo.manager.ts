import { Injectable } from "@nestjs/common";
import { UserBalanceInfo } from "../Model/UserBalanceInfo.model";
const { Op } = require("sequelize");

@Injectable()
export class UserBalanceInfoManager {
  constructor() {}

  /**
   * query recored by user
   * @param user
   * @returns
   */
  async queryByUser(user: string) {
    const userLowerCase = user.toLowerCase();
    const rows = await UserBalanceInfo.findAll({ where: { userAddress: userLowerCase }, limit: 10, order: [["id", "desc"]] });
    return rows;
  }
}
