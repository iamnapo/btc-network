import "dotenv/config.js";

import path from "path";
import { readFileSync } from "fs";

import moment from "moment";
import mongoose from "mongoose";

import Block from "./models/Block.js";

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
	const logFile = readFileSync(path.join(__dirname, "./logs.txt"), "utf8").split("\n");
	const blocks = await Block.find().exec();
	// const blocks = await Block.deleteMany({ $where: "this.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length === 1" }).exec();
	for (const line of logFile) {
		try {
			const blockHash = line.match(/best=(\w.*(?= h))/)[1];
			const arrivedAtNode = Number.parseInt(line.match(/^node(\d.*(?=_1))/)[1] - 1, 10);
			const arrivedAt = moment(line.match(/\| (\w.*?(?= ))/)[1]).valueOf();
			const block = blocks.find((e) => e.blockHash === blockHash);
			if (block) {
				block.arrivedAfterMillis[arrivedAtNode] = Math.max(arrivedAt - block.minedAt, block.arrivedAfterMillis[arrivedAtNode] || 0);
			}
		} catch {
			console.log(line);
		}
	}
	let count = 0;
	await Promise.all(blocks.map((e) => {
		if (e.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length !== 4) count += 1;
		e.markModified("arrivedAfterMillis");
		return e.save();
	}));
	console.log(count);
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((error) => console.error(error));
