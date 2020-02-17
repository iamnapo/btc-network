const inquirer = require("inquirer");
const chalk = require("chalk");
const { realpathSync } = require("fs");

module.exports = async () => {
	const usagePrompt = {
		choices: ["Create required docker-compose files", "Run pre-existing node", "Stop a running node"],
		message: "💭\u{200D} What would you like to do?",
		name: "usage",
		type: "list",
	};

	const inputFileQuestion = {
		filter: (answer) => answer.trim(),
		message: chalk.green("📦\u{200D} What's the input file?"),
		name: "input",
		type: "input",
		validate: (inpt) => {
			try {
				realpathSync(inpt);
				return true;
			} catch (error) {
				return `\`${inpt}\` does not exist!`;
			}
		},
	};

	const customConfigChoiceQuestion = {
		choices: ["Just use the default", "I'll supply my own"],
		message: "⚙️\u{200D}  From what file to get consensus parameters?",
		name: "configChoice",
		type: "list",
	};

	const configFileQuestion = {
		filter: (answer) => answer.trim(),
		message: chalk.green("⚙️\u{200D}  What's the config file?"),
		name: "config",
		type: "input",
		validate: (inpt) => {
			try {
				realpathSync(inpt);
				return true;
			} catch (error) {
				return `\`${inpt}\` does not exist!`;
			}
		},
	};

	const dockerImageQuestion = {
		filter: (answer) => answer.trim(),
		message: chalk.green("🗂️\u{200D}  What image would you like to use?"),
		name: "output",
		default: "iamnapo/btc-network:latest",
		type: "input",
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
		validate: (inpt) => {
			try {
				realpathSync(inpt);
				return true;
			} catch (error) {
				return `\`${inpt}\` does not exist!`;
			}
		},
	};

	const nodeIdQuestion = {
		message: chalk.green("⛵\u{200D} What's the id of the Node?"),
		name: "nodeId",
		default: 1,
		type: "number",
		validate: (inpt) => ((inpt !== parseInt(inpt, 10) || inpt < 1) ? "This must be a positive integer!" : true),
	};

	const { usage } = await inquirer.prompt(usagePrompt);
	if (usage === "Create required docker-compose files") {
		let answers = await inquirer.prompt([inputFileQuestion, dockerImageQuestion]);
		const { configChoice } = await inquirer.prompt(customConfigChoiceQuestion);
		if (configChoice === "I'll supply my own") answers = { ...answers, ...(await inquirer.prompt(configFileQuestion)) };
		answers = { ...answers, ...(await inquirer.prompt(outputFolderCreateQuestion)) };
		return answers;
	}
	const answers = await inquirer.prompt([outputFolderFindQuestion, nodeIdQuestion]);
	return { ...answers, ...(usage === "Run pre-existing node" ? { run: answers.nodeId } : { stop: answers.nodeId }) };
};
