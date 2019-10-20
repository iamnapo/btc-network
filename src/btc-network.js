const path = require("path");
const { existsSync, readFile, writeFile } = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const readFileAsync = require("util").promisify(readFile);
const writeFileAsync = require("util").promisify(writeFile);
const makeDir = require("make-dir");
const yaml = require("js-yaml");
const execa = require("execa");
const { ip } = require("address");

const parse = require("../lib/parse");

module.exports = async ({ input, output, run, image, config }) => {
  if (!run) {
    const spinner = ora().start("Starting creating files!");
    const filePath = input;
    const nodeInfo = JSON.parse(await readFileAsync(filePath, "utf8"));
    if (!existsSync(output)) spinner.succeed(`Created \`${output}\`.`);
    const outputDir = await makeDir(output);
    let shouldAddImage = true;

    if (config) {
      spinner.start("Creating custom source files");
      if (!existsSync(config)) return console.log(`\n${chalk.red.bold(`Couldn't locate ${config}. 😕`)}\n`);
      const userConfig = JSON.parse(await readFileAsync(config, "utf8"));
      const { consensusHFile, chainparamsCPPFile } = await parse(userConfig);
      const dockerfile = await readFileAsync(path.join(__dirname, "../lib/Dockerfile"), "utf8");
      for (const [i] of nodeInfo.entries()) {
        const outDir = await makeDir(path.join(output, `btc-node-${i + 1}`));
        await writeFileAsync(path.join(outDir, "consensus.h"), consensusHFile);
        await writeFileAsync(path.join(outDir, "chainparams.cpp"), chainparamsCPPFile);
        await writeFileAsync(path.join(outDir, "Dockerfile"), dockerfile);
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
            ...(shouldAddImage
              ? { image }
              : { build: "." }),
            ports: [
              `${node.p2p_port}:18444`,
              ...(node.rpc_port ? [`${node.rpc_port}:18443`] : []),
            ],
            expose: ["18444"],
            volumes: ["./data/btc-node:/root/btc-node"],
            command: [
              "-conf=/root/.bitcoin/bitcoin.conf",
              "-datadir=/root/btc-node",
            ].concat(...nodeInfo.filter((e, ind) => ind !== i).map(((otherNode) => `-addnode=${otherNode.ip}:${otherNode.p2p_port}`))),
          },
        },
      };

      const outDir = await makeDir(path.join(output, `btc-node-${i + 1}`));
      await writeFileAsync(path.join(outDir, "docker-compose.yml"), yaml.safeDump(compose));
      await makeDir(path.join(output, `btc-node-${i + 1}`, "data", "btc-node"));
      spinner.succeed(`Created btc-node-${i + 1}.`);
    }

    return console.log(`\n${chalk.blue.bold(`Created all files into ${outputDir}. 🎉`)}\n`);
  }
  const composeFile = path.join(output, `btc-node-${run}`, "docker-compose.yml");
  if (!existsSync(composeFile)) return console.log(`\n${chalk.red.bold(`Couldn't locate ${composeFile}. 😕`)}\n`);
  const spinner = ora().start(`Starting \`btc-node-${run}\``);
  try {
    await execa("docker-compose", ["-f", composeFile, "up", "-d"]);
    const composeFileContent = await readFileAsync(composeFile);
    const { services: { "btc-node": { ports } } } = yaml.safeLoad(composeFileContent);
    spinner.succeed(`Node btc-node-${run} started! You can now access it.`);
    const lanIp = ip();
    console.log(`\n${chalk.green.bold(`  On this machine:${"\n"
    }    JSON-RPC: localhost:${ports.find((e) => e.includes("18443")).split(":")[0]}${"\n"
    }    P2P: localhost:${ports.find((e) => e.includes("18444")).split(":")[0]}`)}\n`);

    if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanIp)) {
      console.log(`${chalk.green.bold(`  On your local network:${"\n"
      }    JSON-RPC: ${lanIp}:${ports.find((e) => e.includes("18443")).split(":")[0]}${"\n"
      }    P2P: ${lanIp}:${ports.find((e) => e.includes("18444")).split(":")[0]}`)}\n`);
    }
    return null;
  } catch (error) {
    spinner.fail("Couldn't start node. Is the docker daemon running? 😕");
    return console.log(`\n${chalk.red(error.message)}\n`);
  }
};
