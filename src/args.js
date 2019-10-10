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
    --output, -o   Folder to output created docker-compose files
    --run, -r      Start the docker container of a specific node

  Non-Interactive Example
    $ btc-network -i nodes.json -o out_files
  `, {
      flags: {
        input: { alias: "i", type: "string" },
        output: { alias: "o", type: "string", default: "compose_files" },
        run: { alias: "r", type: "string" },
      },
    },
  );
  updateNotifier({ pkg: cli.pkg, shouldNotifyInNpmScript: true }).notify();

  return { input: cli.flags.input, output: cli.flags.output, run: cli.flags.run };
};