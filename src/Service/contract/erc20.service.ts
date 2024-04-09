const { ethers } = require("ethers");
import config from "../../Config";
import ContractUtils from "../../Common/Utils/ContractUtils";
import contractArtifact from "./artifacts/IERC20.json";

let decimalMap = new Map();
let nameMap = new Map();


/**
 * 获取token的名称
 */
export const getTokenName = async (tokenAddres: string) => {
  var contract = ContractUtils.getEthersContract(contractArtifact, tokenAddres);
  if (!nameMap.get(tokenAddres)) {
    var name = await contract.name();
    nameMap.set(tokenAddres, name);
  }
  name = nameMap.get(tokenAddres);

  if (!name) throw new Error(`[getTokenName] fail. tokenAddress:${tokenAddres}`);
  return name;
};


/**
 * 获取token的精度
 */
export const getTokenDecimal = async (tokenAddres: string) => {
  var contract = ContractUtils.getEthersContract(contractArtifact, tokenAddres);
  if (!decimalMap.get(tokenAddres)) {
    var decimal = await contract.decimals();
    decimalMap.set(tokenAddres, decimal);
  }
  decimal = decimalMap.get(tokenAddres);

  if (!decimal) throw new Error(`[getTokenDecimal] fail. tokenAddress:${tokenAddres}`);
  return decimal;
};

/**
 * 获取代币的发行量
 */
export const getTotalSupply = async (tokenAddres: string) => {
  var contract = ContractUtils.getEthersContract(contractArtifact, tokenAddres);
  var totalSupply = await contract.totalSupply();
  return totalSupply;
};

/**
 * @notice  将bignumber类型数转换成普通number
 * @param tokenAddres token合约地址
 * @param amountBn 金额的bigNumber类型
 */
export const formatUnits = async (tokenAddres: string, amountBn: string) => {
  amountBn = amountBn ? amountBn : "0";
  const tokendecimal = await getTokenDecimal(tokenAddres);
  const amount = ethers.utils.formatUnits(amountBn, tokendecimal);
  return parseFloat(amount);
};

/**
 * @notice  将普通number数转换成bignumber类型
 * @param tokenAddres token合约地址
 * @param amount 金额的普通number类型值
 */
export const parseUnits = async (tokenAddres: string, amount: number) => {
  const tokendecimal = await getTokenDecimal(tokenAddres);
  const amountBn = ethers.utils.parseUnits(amount, tokendecimal);
  return amountBn;
};

/**
 * @notice  根据块高获取当时的代币发行量
 * @param tokenAddres token合约地址
 * @param blockHeight 块高
 */
export const getTotalSupplyByBlock = async (tokenAddres: string, blockHeight: number) => {
  var contract = ContractUtils.getWeb3Contract(contractArtifact, tokenAddres);
  return await contract.methods.totalSupply().call(null, blockHeight);
};

/**
 * @notice  根据块高获取指定holder当时的余额
 * @param tokenAddres token合约地址
 * @param holderAddress holder地址
 * @param blockHeight 块高
 */
export const getBalanceByBlock = async (tokenAddres: string, holderAddress: string, blockHeight: number) => {
  var contract = ContractUtils.getWeb3Contract(contractArtifact, tokenAddres);
  return await contract.methods.balanceOf(holderAddress).call({}, blockHeight);
};

/**
 * @notice  根据获取指定holder的余额
 * @param tokenAddres token合约地址
 * @param holderAddress holder地址
 */
export const getBalance = async (tokenAddres: string, holderAddress: string) => {
  var contract = ContractUtils.getEthersContract(contractArtifact, tokenAddres);
  var totalSupply = await contract.balanceOf(holderAddress);
  return totalSupply;
};
