let Web3 = require("web3");

export default {
  web3Bsc: new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.defibit.io")),
  db: {
    host: "127.0.0.1",
    port: 3366,
    user: "root",
    password: "123456",
    database: "templateServer",
    charset: "UTF8_GENERAL_CI",
    connectTimeout: 10000,
    connectionLimit: 100,
  },

  serverPort: 3399,
  // orderTaskCron: "*/45 * * * * *", //订单处理间隔时间  45秒
};
