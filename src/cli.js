/* eslint-disable unicorn/prefer-top-level-await */
import chalk from "chalk";
import gradient from "gradient-string";

import checkArgs from "./args.js";
import inquire from "./inquire.js";
import btcNetwork from "./btc-network.js";

const getIntro = (columns) => {
	const ascii = `
  ___.    __                                  __                       __
  \\_ |___/  |_  ____             ____   _____/  |___  _  _____________|  | __
   | __ \\   __\\/ ___\\   ______  /    \\_/ __ \\   __\\ \\/ \\/ /  _ \\_  __ \\  |/ /
   | \\_\\ \\  | \\  \\___  /_____/ |   |  \\  ___/|  |  \\     (  <_> )  | \\/    <
   |___  /__|  \\___  >         |___|  /\\___  >__|   \\/\\_/ \\____/|__|  |__|_ \\
       \\/          \\/               \\/     \\/                              \\/
    `;
	if (columns && columns >= 74) return chalk.bold(gradient.mind(ascii));
	return `\n${chalk.cyan.bold.underline("btc-network")}\n`;
};

(async () => {
	const argInfo = checkArgs();
	const options = [argInfo.input, argInfo.run, argInfo.stop].some(Boolean) ? argInfo : {
		...argInfo,
		...(await (() => {
			console.log(getIntro(process.stdout.columns));
			return inquire();
		})()),
	};
	return btcNetwork(options);
})().then(() => process.exit(0)).catch((error) => { console.error(`${chalk.red(error.message)}`); process.exit(1); });
