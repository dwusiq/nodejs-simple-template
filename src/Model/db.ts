import { Sequelize } from "sequelize-typescript";
import config from "../Config";
import { BalanceInfo } from "./balanceInfo.model";

export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  models: [BalanceInfo], // 注册模型
  dialect: "mysql",
  timezone: "+08:00", //东八时区
});