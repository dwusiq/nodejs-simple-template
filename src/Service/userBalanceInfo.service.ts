import { Injectable } from "@nestjs/common";
import { UserBalanceInfo } from "../Model/UserBalanceInfo.model";
import { getBalance } from "./contract/erc20.service";

@Injectable()
export class UserBalanceInfoService {
  constructor() {}

  /**
   * save user and tokenF
   * @param user
   * @param token
   * @returns
   */
  async addUserAndToken(user: string, token: string) {
    const userLowerCase = user.toLowerCase();
    const tokenLowerCase = token.toLowerCase();
    let row = await UserBalanceInfo.findOne({ where: { userAddress: userLowerCase, tokenAddress: tokenLowerCase } });
    if (!row) {
      const balance = await getBalance(tokenLowerCase, userLowerCase);
      row = await UserBalanceInfo.create({ userAddress: userLowerCase, tokenAddress: tokenLowerCase, balance: balance });
    }
    return row;
  }

 
}
