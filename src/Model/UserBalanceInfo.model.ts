import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user_balance_info",
  underscored: true,
  charset: "utf8mb4",
  collate: "utf8mb4_unicode_ci",
  comment: "用户余额",
  indexes: [{ name: "idx_users", unique: false, fields: ["user_address"] }],
})
export class UserBalanceInfo extends Model<UserBalanceInfo> {
  @Column({ primaryKey: true, autoIncrement: true, comment: "自增Id" })
  id: bigint;
  @Column({ type: DataType.STRING, allowNull: false, comment: "用户地址" })
  userAddress: string;
  @Column({ type: DataType.STRING, allowNull: false, comment: "代币地址" })
  tokenAddress: string;
  @Column({ type: DataType.DECIMAL(30, 16), allowNull: false, defaultValue: 0, comment: "购买债券花费资金数量" })
  balance: number;
}
