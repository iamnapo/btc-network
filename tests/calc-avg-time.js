import "dotenv/config";

import mongoose from "mongoose";
import mathjs from "mathjs";

import Block from "./models/block.js";

mongoose.connect(process.env.DB_URI);

try {
	const blocks = await Block.find().exec();
	const blockAverages = [];
	for (const block of blocks) {
		const arr = block.arrivedAfterMillis.filter((e) => Number.isFinite(e));
		blockAverages.push(mathjs.mean([...(arr.length > 0 ? arr : [0])]) / 1000);
	}

	const allTimes = blocks.reduce((all, cur) => [...all, cur.arrivedAfterMillis], []).filter((e) => Number.isFinite(e) && e > 0);
	console.log(`Min: ${mathjs.min(allTimes)}`);
	console.log(`Max: ${mathjs.max(allTimes)}`);
	console.log(`Mean: ${mathjs.mean(allTimes)}`);
	console.log(`Median: ${mathjs.median(allTimes)}`);
	console.log(`Std: ${mathjs.std(allTimes)}`);
	console.log(JSON.stringify(blockAverages));
	console.log("Done!\n");
	process.exit(0);
} catch (error) {
	console.log(error);
}
