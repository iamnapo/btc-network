const meow = require("meow");
const updateNotifier = require("update-notifier");

module.exports = async () => {
  const cli = meow(
    `
  Usage
    $ btc-network

  Non-Interactive Usage
    $ btc-network [options]

  Options
    --input, -i    Input file containing node info
    --output, -o   Folder to output created docker-compose files (Default: "compose_files")
    --run, -r      Start the docker container of a specific node
    --image, -e    The image to use for creating the node (Default: "iamnapo/btc-network:latest")
    --config, -c   Custom consensus configuration properties file

  Non-Interactive Example
    $ btc-network -i nodes.json -o out_files
  `, {
      flags: {
        input: { alias: "i", type: "string" },
        output: { alias: "o", type: "string", default: "compose_files" },
        image: { alias: "e", type: "string", default: "iamnapo/btc-network:latest" },
        run: { alias: "r", type: "string" },
        config: { alias: "c", type: "string" },
      },
    },
  );
  updateNotifier({ pkg: cli.pkg, shouldNotifyInNpmScript: true }).notify();

  const { input, output, image, run, config } = cli.flags;
  return { input, output, image, run, config };
};
