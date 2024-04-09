import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserBalanceInfoManager } from "../Manager/userBalanceInfo.manager";
import { UserBalanceInfoService } from "../Service/userBalanceInfo.service";
import { ErrorHandler } from "../Common/Response/ErrorHandler";
import { UserBalanceInfoAddReq } from "../Common/ReqRspParam/UserBalanceInfoAddReq";
import { logDebug } from "../Common/Utils/LogUtils";

@Controller("user-balance")
export class UserBalanceInfoController {
  constructor(private readonly userBalanceInfoService: UserBalanceInfoService, private readonly userBalanceInfoManager: UserBalanceInfoManager) {}

  /**
   * 新增
   */
  @Post("add")
  async addUserTokenInfo(@Body() param: UserBalanceInfoAddReq) {
    logDebug(`[addUserTokenInfo] start`);
    return this.userBalanceInfoService.addUserAndToken(param.userAddress, param.tokenAddress).catch(ErrorHandler.handlerError);
  }

  /**
   *
   */
  @Get(":user/list")
  async queryByUser(@Param("user") user: string) {
    logDebug(`[queryByUser] start`);
    return this.userBalanceInfoManager.queryByUser(user).catch(ErrorHandler.handlerError);
  }
}
