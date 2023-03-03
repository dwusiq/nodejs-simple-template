import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SequelizeModule } from "@nestjs/sequelize";
import config from "./Config";
import { sequelize } from "./Model/db";
import { TemplateModule } from "./Module/template.module";

/**
 * @Module() 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 */
@Module({
  imports: [ScheduleModule.forRoot(), SequelizeModule.bind(sequelize), TemplateModule],
})
export class AppModule implements OnApplicationBootstrap {
  /**
   * @notice 初始化mysql相关配置
   */
  async initMysql() {
    //账号认证
    await sequelize.authenticate();
    // 开发环境强制同步表结构
    if (config.isDev) await sequelize.sync({ alter: true });
  }

  //服务启动后执行的函数
  async onApplicationBootstrap() {
    //初始化mysql相关配置
    await this.initMysql();
    //服务启动后执行程序
  }
}
