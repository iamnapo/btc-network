const gradient = require("gradient-string");
const chalk = require("chalk");

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

module.exports = { getIntro };
