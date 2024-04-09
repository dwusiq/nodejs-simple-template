let Web3 = require("web3");

const defaultEndPoint= "https://arb1.arbitrum.io/rpc";

export default {
  defaultWeb3Obj: new Web3(new Web3.providers.HttpProvider(defaultEndPoint)),
  defaultEndPoint:defaultEndPoint,
  db: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "123456",
    database: "templateServer",
    charset: "UTF8_GENERAL_CI",
    connectTimeout: 10000,
    connectionLimit: 100,
  },

  serverPort: 3399,
};
