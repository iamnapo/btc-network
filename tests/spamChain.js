import "dotenv/config.js";

import Client from "bitcoin-core";
import Chance from "chance";
import mongoose from "mongoose";

import Block from "./models/Block.js";
import createTxs from "./createTxs.js";

const chance = new Chance();
const NODES_PORTS = [18_401, 18_402, 18_403, 18_404];
const ADDRESSES = [
	"2N5TFopmSQ7C4UVsBJEnBoToZKtrRoUyXs7",
	"2NDckBMqJLRyWuVB2vnutAJSczCFUVN3tRv",
	"2N5ofhsCfVKvianzc7xVvBuym362rAcXPeG",
	"2N4XRLtrNCx3n8AYDjCKGqHn76SAAHFVjSY",
];

const mongooseOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	poolSize: 100,
	keepAlive: true,
	keepAliveInitialDelay: 300_000,
	useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URI, mongooseOptions);

(async () => {
	for (let i = 0; i < 200; i += 1) {
		const { txCreator } = await createTxs();
		const blockCreator = chance.pickone(NODES_PORTS);
		const client = new Client({ port: blockCreator, username: "btc", password: "btc" });

		const startTime = process.hrtime();
		const [blockHash] = await client.generateToAddress(1, ADDRESSES[NODES_PORTS.indexOf(txCreator)]);
		const minedAt = Date.now();
		const endTime = process.hrtime(startTime);
		const { nTx, height } = await client.getBlock(blockHash);
		const millisToMine = ((endTime[0] * 1e9) + endTime[1]) / 1e6;
		await Block.create({ height, nTx, minedAt, blockHash, millisToMine, minerNode: NODES_PORTS.indexOf(blockCreator) + 1 });

		// Hack to avoid soft-forks
		await client.generateToAddress(3, ADDRESSES[NODES_PORTS.indexOf(txCreator)]);
		await new Promise((r) => setTimeout(r, 2000));
	}
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((error) => console.log(error));
