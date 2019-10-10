#!/usr/bin/env node

const chalk = require("chalk");
const checkArgs = require("./args");
const inquire = require("./inquire");
const btcNetwork = require("./btc-network");
const utils = require("./utils");

(async () => {
  const argInfo = await checkArgs();
  const options = argInfo.input !== undefined || argInfo.run !== undefined ? argInfo : {
    ...argInfo,
    ...(await (() => {
      console.log(utils.getIntro(process.stdout.columns));
      return inquire();
    })()),
  };
  return btcNetwork(options);
})().then(() => process.exit(0)).catch((error) => { console.error(`${chalk.red(error.message)}`); process.exit(1); });
