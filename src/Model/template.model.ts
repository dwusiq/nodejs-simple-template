import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "template", // 数据库表名
  comment: "账户余额",
  timestamps: false, //关闭 Sequelize 自动生成时间戳
})
export class Template extends Model {
  @Column({ primaryKey: true, autoIncrement: true, comment: "自增Id" })
  id: bigint;
  @Column
  userAddress: string;
  @Column
  coinType: number;
  @Column
  balance: number;
  @Column
  status: number;
  @Column
  remark?: string;
  @Column
  createTime: Date;
  @Column
  modifyTime: Date;
}
