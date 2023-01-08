import "dotenv/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFileSync } from "node:fs";

import moment from "moment";
import mongoose from "mongoose";

import Block from "../models/block.js";

mongoose.connect(process.env.DB_URI);

try {
	for (const i of Array.from({ length: 20 }).keys()) {
		const logFile = readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "logs", `./logs${i + 1}.txt`), "utf8").split("\n");
		const blocks = await Block.find().exec();
		// const blocks = await Block.deleteMany({
		// 	$where: "this.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length === 1",
		// }).exec();
		for (const line of logFile) {
			try {
				const blockHash = line.match(/best=(\w.*(?= h))/)[1];
				const arrivedAtNode = i + 1;
				const arrivedAt = moment(line.match(/\| (\w.*?(?= ))/)[1]).valueOf();
				const block = blocks.find((e) => e.blockHash === blockHash);
				if (block) {
					block.arrivedAfterMillis[arrivedAtNode] = Math.max(
						arrivedAt - block.minedAt,
						block.arrivedAfterMillis[arrivedAtNode] || 0,
					);
				}
			} catch {
				console.log(line);
			}
		}

		let count = 0;
		await Promise.all(blocks.map((e) => {
			if (e.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length !== i + 1) count += 1;
			e.markModified("arrivedAfterMillis");
			return e.save();
		}));
		console.log(count);
	}

	console.log("Done!\n");
	process.exit(0);
} catch (error) {
	console.error(error);
}
