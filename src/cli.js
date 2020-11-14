const chalk = require("chalk");
const gradient = require("gradient-string");

const checkArgs = require("./args");
const inquire = require("./inquire");
const btcNetwork = require("./btc-network");

function getIntro(columns) {
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
}

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
