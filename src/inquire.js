const inquirer = require("inquirer");
const chalk = require("chalk");
const { existsSync } = require("fs");

module.exports = async () => {
  const usagePrompt = {
    choices: ["Create required docker-compose files", "Run pre-existing ones"],
    message: "💭\u{200D} What would you like to do?",
    name: "usage",
    type: "list",
  };

  const inputFileQuestion = {
    filter: (answer) => answer.trim(),
    message: chalk.green("📦\u{200D} What's the input file?"),
    name: "input",
    type: "input",
    validate: (inpt) => (existsSync(inpt) ? true : `\`${inpt}\` does not exist!`),
  };

  const outputFolderCreateQuestion = {
    filter: (answer) => answer.trim(),
    message: chalk.green("🐳\u{200D} Where to put docker-compose files?"),
    name: "output",
    default: "compose_files",
    type: "input",
  };

  const outputFolderFindQuestion = {
    filter: (answer) => answer.trim(),
    message: chalk.green("🐳\u{200D} Where are the docker-compose files?"),
    name: "output",
    default: "compose_files",
    type: "input",
    validate: (inpt) => (existsSync(inpt) ? true : `\`${inpt}\` does not exist!`),
  };

  const nodeIdQuestion = {
    message: chalk.green("⛵\u{200D}  What's the id of the Node?"),
    name: "run",
    default: 1,
    type: "number",
    filter: (inpt) => inpt.toString(),
  };

  const { usage } = await inquirer.prompt(usagePrompt);
  if (usage === "Create required docker-compose files") {
    const answers = await inquirer.prompt([inputFileQuestion, outputFolderCreateQuestion]);
    return answers;
  }
  const answers = await inquirer.prompt([outputFolderFindQuestion, nodeIdQuestion]);
  return answers;
};
