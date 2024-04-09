import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SequelizeModule } from "@nestjs/sequelize";
import config from "./Config";
import { UserBalanceInfo } from "./Model/UserBalanceInfo.model";
import { TaskModule } from "./Module/task.module";
import { UserBalanceInfoModule } from "./Module/userBalanceInfo.module";
/**
 * @Module() 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 */
@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: "mysql", // 数据库类型，sequelize支持  Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 且对数据库版本有要求。
      host: config.db.host, // 主机ip
      port: config.db.port, // 数据库端口 mysql默认在3306端口
      username: config.db.user, // 数据库用户名
      password: config.db.password, // 数据库密码
      database: config.db.database, // 具体数据库
      logging: config.isDev ? true : false,
      timezone: "+08:00", //东八时区
      autoLoadModels: config.isDev ? true : false,
      synchronize: config.isDev ? true : false, //自动建表
      models: [UserBalanceInfo], // 要开始使用模型，我们需要通过将其插入到`forRoot()`方法选项的`models`数组中来让`Sequelize`知道它的存在。
    }),
    TaskModule,
    UserBalanceInfoModule,
  ],
})
export class AppModule {}
