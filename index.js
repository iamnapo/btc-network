const yaml = require("js-yaml");
const writeFileAsync = require("util").promisify(require("fs").writeFile);
const readFileAsync = require("util").promisify(require("fs").readFile);
const path = require("path");
const makeDir = require("make-dir");

(async () => {
  const filePath = process.argv[2].startsWith("/") ? process.argv[2] : path.join(__dirname, process.argv[2]);
  const nodes = JSON.parse(await readFileAsync(filePath, "utf8"));

  await Promise.all(nodes.map((node, i) => {
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
          ].concat(...nodes.filter((e, ind) => ind !== i).map(((otherNode) => `-addnode=${otherNode.ip}:${otherNode.p2p_port}`))),
        },
      },
    };
    return makeDir(path.join(process.argv[3] || "compose_files", `btc-node-${i + 1}`))
      .then(((outDir) => writeFileAsync(path.join(outDir, "docker-compose.yml"), yaml.safeDump(compose))
        .then(() => makeDir(path.join(process.argv[3] || "compose_files", `btc-node-${i + 1}`, "data", "btc-node")))));
  }));
})().then(() => process.exit(0)).catch(({ message }) => console.error(message));
