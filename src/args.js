import { readFileSync } from "node:fs";

import meow from "meow";
import updateNotifier from "update-notifier";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

const args = () => {
	const cli = meow(
		`
  Usage
    $ btc-network

  Non-Interactive Usage
    $ btc-network [options]

  Options
    --input,  -i  Input file containing node info.
    --output, -o  Folder to output created docker-compose files. (Default: "compose_files")
    --run,    -r  Start the docker container of a specific node. Use \`*\` to start all nodes.
    --stop,   -s  Stop the docker container of a specific node. Use \`*\` to stop all nodes.
    --image,  -e  The image to use for creating the node. (Default: "iamnapo/btc-network:latest")
    --config, -c  Custom consensus configuration properties file.

  Non-Interactive Example
    $ btc-network -i nodes.json -o out_files
  `, {
			flags: {
				input: { shortFlag: "i", type: "string" },
				output: { shortFlag: "o", type: "string", default: "compose_files" },
				image: { shortFlag: "e", type: "string", default: "iamnapo/btc-network:latest" },
				run: { shortFlag: "r", type: "string" },
				stop: { shortFlag: "s", type: "string" },
				config: { shortFlag: "c", type: "string" },
			},
			importMeta: { url: import.meta.url },
		},
	);
	updateNotifier({ pkg: packageJson, updateCheckInterval: 0 }).notify();

	const { input, output, image, run, stop, config } = cli.flags;
	return { input, output, image, run, stop, config };
};

export default args;
