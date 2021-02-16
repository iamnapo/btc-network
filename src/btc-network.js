import path from "path";
import { existsSync, realpathSync } from "fs";
import { readFile, writeFile } from "fs/promises";

import chalk from "chalk";
import ora from "ora";
import makeDir from "make-dir";
import yaml from "js-yaml";
import execa from "execa";
import address from "address";
import globby from "globby";
import { numberSmallToLarge } from "@iamnapo/sort";

import parse from "../lib/parse.js";

export default async ({ input, output, run, image, config, stop }) => {
	if (run) {
		const fld = await globby(path.posix.join(output, `btc-node-${run === "*" ? "+([0-9])" : run}`), { expandDirectories: false, onlyFiles: false });
		const nodes = fld.map((p) => Number.parseInt(p.split("-").slice(-1), 10)).sort(numberSmallToLarge());
		for (const node of nodes) {
			const composeFile = path.join(output, `btc-node-${node}`, "docker-compose.yml");
			if (!existsSync(composeFile)) return console.log(`\n${chalk.red.bold(`Couldn’t locate ${composeFile}. 😕`)}\n`);
			const spinner = ora().start(`Starting \`btc-node-${node}\``);
			try {
				await execa("docker-compose", ["-f", composeFile, "up", "-d"]);
				const composeFileContent = await readFile(composeFile);
				const { services: { "btc-node": { ports } } } = yaml.load(composeFileContent);
				spinner.succeed(`Node btc-node-${node} started! You can now access it.`);
				const lanIp = address.ip();
				console.log(`\n${chalk.green.bold(`  On this machine:${"\n"
				}    JSON-RPC: localhost:${ports.find((e) => e.includes("18443")).split(":")[0]}${"\n"
				}    P2P: localhost:${ports.find((e) => e.includes("18444")).split(":")[0]}`)}\n`);

				if (/^10\.|^172\.(1[6-9]|2\d|3[01])\.|^192\.168\./.test(lanIp)) {
					console.log(`${chalk.green.bold(`  On your local network:${"\n"
					}    JSON-RPC: ${lanIp}:${ports.find((e) => e.includes("18443")).split(":")[0]}${"\n"
					}    P2P: ${lanIp}:${ports.find((e) => e.includes("18444")).split(":")[0]}`)}\n`);
				}
				if (/\b(?!(10)|192\.168|172\.(2\d|1[6-9]|3[0-2]))(?:\d{1,3}\.){3}\d{1,3}/.test(lanIp)) {
					console.log(`${chalk.green.bold(`  Publicly (if this machine is accessible):${"\n"
					}    JSON-RPC: ${lanIp}:${ports.find((e) => e.includes("18443")).split(":")[0]}${"\n"
					}    P2P: ${lanIp}:${ports.find((e) => e.includes("18444")).split(":")[0]}`)}\n`);
				}
			} catch (error) {
				spinner.info(chalk.red(error.stderr || error.shortMessage));
				spinner.fail("Couldn’t start node. 😕");
			}
		}
		return null;
	}
	if (stop) {
		const fld = await globby(path.posix.join(output, `btc-node-${stop === "*" ? "+([0-9])" : stop}`), { expandDirectories: false, onlyFiles: false });
		const nodes = fld.map((p) => Number.parseInt(p.split("-").slice(-1), 10)).sort((a, b) => a - b);
		for (const node of nodes) {
			const composeFile = path.join(output, `btc-node-${node}`, "docker-compose.yml");
			if (!existsSync(composeFile)) return console.log(`\n${chalk.red.bold(`Couldn’t locate ${composeFile}. 😕`)}\n`);
			const spinner = ora().start(`Stoping \`btc-node-${node}\``);
			try {
				await execa("docker-compose", ["-f", composeFile, "down", "-v"]);
				spinner.succeed(`Node btc-node-${node} stopped!`);
			} catch (error) {
				spinner.info(chalk.red(error.stderr || error.shortMessage));
				spinner.fail("Couldn’t stop node. 😕");
			}
		}
		return null;
	}
	const spinner = ora().start("Starting creating files!");
	const filePath = realpathSync(input);
	const nodeInfo = JSON.parse(await readFile(filePath, "utf8"));
	if (!existsSync(output)) spinner.succeed(`Created \`${output}\`.`);
	const outputDir = await makeDir(output);
	let shouldAddImage = true;

	if (config) {
		spinner.start("Creating custom source files");
		try {
			realpathSync(config);
		} catch (error) {
			return console.log(`\n${chalk.red.bold(`Couldn’t locate ${error.path}. 😕`)}\n`);
		}
		const userConfig = JSON.parse(await readFile(realpathSync(config), "utf8"));
		const { consensusHFile, chainparamsCPPFile } = await parse(userConfig);
		const dockerfile = await readFile(path.join(__dirname, "../lib/Dockerfile"), "utf8");
		for (const [i] of nodeInfo.entries()) {
			const outDir = await makeDir(path.join(output, `btc-node-${i + 1}`));
			await writeFile(path.join(outDir, "consensus.h"), consensusHFile);
			await writeFile(path.join(outDir, "chainparams.cpp"), chainparamsCPPFile);
			await writeFile(path.join(outDir, "Dockerfile"), dockerfile);
		}
		shouldAddImage = false;
		spinner.succeed("Created custom `consensus.h` and `chainparams.cpp`.");
	}

	for (const [i, node] of nodeInfo.entries()) {
		spinner.start(`Creating \`btc-node-${i + 1}\``);

		const compose = {
			version: "3",
			services: {
				"btc-node": {
					...(shouldAddImage ? { image } : { build: "." }),
					ports: [
						`${node.p2p_port}:18444`,
						...(node.rpc_port ? [`${node.rpc_port}:18443`] : []),
					],
					expose: ["18444"],
					volumes: ["./data/btc-node:/root/btc-node"],
					command: [
						"-conf=/root/.bitcoin/bitcoin.conf",
						"-datadir=/root/btc-node",
						...nodeInfo.filter((e, ind) => ind !== i).map(((otherNode) => `-addnode=${otherNode.ip}:${otherNode.p2p_port}`)),
					],
				},
			},
		};

		const outDir = await makeDir(path.join(output, `btc-node-${i + 1}`));
		await writeFile(path.join(outDir, "docker-compose.yml"), yaml.dump(compose));
		await makeDir(path.join(output, `btc-node-${i + 1}`, "data", "btc-node"));
		spinner.succeed(`Created btc-node-${i + 1}.`);
	}
	return console.log(`\n${chalk.blue.bold(`Created all files into ${outputDir}. 🎉`)}\n`);
};
