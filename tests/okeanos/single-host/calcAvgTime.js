require("dotenv").config();
const mongoose = require("mongoose");
const mathjs = require("mathjs");

const Block = require("../../models/Block");

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
	const blocks = await Block.find().exec();
	const blockAverages = [];
	blocks.forEach((block) => {
		const arr = block.arrivedAfterMillis.filter((e) => Number.isFinite(e));
		blockAverages.push(mathjs.mean([...(arr.length > 0 ? arr : [0])]) / 1000);
	});
	const allTimes = blocks.reduce((all, cur) => all.concat(cur.arrivedAfterMillis), []).filter((e) => Number.isFinite(e)).filter((e) => e > 0);
	console.log(`Min: ${mathjs.min(allTimes)}`);
	console.log(`Max: ${mathjs.max(allTimes)}`);
	console.log(`Mean: ${mathjs.mean(allTimes)}`);
	console.log(`Median: ${mathjs.median(allTimes)}`);
	console.log(`Std: ${mathjs.std(allTimes)}`);
	console.log(JSON.stringify(blockAverages));
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((error) => console.log(error));
