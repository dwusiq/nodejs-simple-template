import { Module } from "@nestjs/common";
import { TaskPullUserBalanceService } from "../Service/task/taskPullAllUserBalance";

//TODO 临时方案

@Module({
  controllers: [],
  providers: [TaskPullUserBalanceService],
})
export class TaskModule {}
