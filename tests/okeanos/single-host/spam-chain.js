import "dotenv/config";

import Client from "bitcoin-core";
import Chance from "chance";
import mongoose from "mongoose";

import Block from "../../models/block.js";

import createTxs from "./create-txs.js";

const chance = new Chance();
const NODES = [
	18_401,
	18_402,
	18_403,
	18_404,
	18_405,
	18_406,
	18_407,
	18_408,
	18_409,
];
const ADDRESSES = [
	"2N2ehpH3BqLgAHq9tmiY8Ua5ej3wdzgk7SL",
	"2NEZd6o4NoVbWHy5KVYG3vhx8t1tu4Kg3c4",
	"2NBhSA8weHUPdg62R4mNLFTAfM8NaUSnjKz",
	"2MyteWeCjzgiRENxUcUepfagKPtfDEccN1d",
	"2N8uAgimxwAMquHUtU3uoA9fNEws8rx9kFS",
	"2N2QkxgwGm11qKMW2n27KuiFFUzHVX5hqdZ",
	"2N1LreRLf9KCmnQmumFwjyADuTh9aEaf9U5",
	"2MuSjBbtNLHefWGxgYj3bZikGBch2qiSaYD",
	"2MyvZyPuuxrDm3kbxGtUyiyLrfc8q8yfdGc",
];

mongoose.connect(process.env.DB_URI);

try {
	for (let i = 0; i < 200; i += 1) {
		const { txCreator } = await createTxs();
		const blockCreator = chance.pickone(NODES);
		const client = new Client({ host: "localhost", port: blockCreator, username: "btc", password: "btc" });

		const startTime = process.hrtime();
		const [blockHash] = await client.generateToAddress(1, ADDRESSES[NODES.indexOf(txCreator)]);
		const minedAt = Date.now();
		const endTime = process.hrtime(startTime);
		const { nTx, height } = await client.getBlock(blockHash);
		console.log(i + 1, height);
		const millisToMine = ((endTime[0] * 1e9) + endTime[1]) / 1e6;
		await Block.create({ height, nTx, minedAt, blockHash, millisToMine, minerNode: NODES.indexOf(blockCreator) + 1 });

		// Hack to avoid soft-forks
		await new Promise((r) => { setTimeout(r, 1000 * 4); });
	}

	console.log("Done!\n");
	process.exit(0);
} catch (error) {
	console.log(error);
	process.exit(1);
}
