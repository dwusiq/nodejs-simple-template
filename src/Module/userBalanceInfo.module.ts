import { Module } from "@nestjs/common";
import { UserBalanceInfoController } from "../Controller/userBalanceInfo.controller";
import { UserBalanceInfoManager } from "../Manager/userBalanceInfo.manager";
import { UserBalanceInfoService } from "../Service/userBalanceInfo.service";

//TODO 临时方案

@Module({
  controllers: [UserBalanceInfoController],
  providers: [UserBalanceInfoService,UserBalanceInfoManager],
})
export class UserBalanceInfoModule {}
