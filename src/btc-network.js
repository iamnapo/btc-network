const path = require("path");
const { existsSync, readFile, writeFile } = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const readFileAsync = require("util").promisify(readFile);
const writeFileAsync = require("util").promisify(writeFile);
const makeDir = require("make-dir");
const yaml = require("js-yaml");

module.exports = async ({ input, output, run }) => {
  if (!run) {
    const spinner = ora().start("Starting creating files!");
    const filePath = input;
    const nodeInfo = JSON.parse(await readFileAsync(filePath, "utf8"));
    if (!existsSync(output)) spinner.succeed(`Created \`${output}\`.`);
    const outputDir = await makeDir(output);

    for (const [i, node] of nodeInfo.entries()) {
      spinner.start(`Creating \`btc-node-${i + 1}\``);

      const compose = {
        version: "3",
        services: {
          "btc-node": {
            image: "iamnapo/btc-network:latest",
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

    console.log(`\n${chalk.blue.bold(`Created all files into ${outputDir}. 🎉`)}\n`);
  } else {
    console.log(`\n${chalk.blue.bold("Well...you'll have to wait until I implement this. 😕")}\n`);
  }
};
