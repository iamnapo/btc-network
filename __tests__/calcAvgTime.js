const mongoose = require("mongoose");
const mathjs = require("mathjs");

const Block = require("./models/Block");

const mongooseOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	poolSize: 100,
	keepAlive: true,
	keepAliveInitialDelay: 300000,
	useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost:27017/btc-network-okeanos", mongooseOptions);

(async () => {
	const blocks = await Block.find().exec();
	const blockAverages = [];
	blocks.forEach((block) => blockAverages.push(mathjs.mean([0, ...block.arrivedAfterMillis.filter(Number.isFinite)]) / 1000));
	const allTimes = blocks.reduce((all, cur) => all.concat(cur.arrivedAfterMillis), []).filter(Number.isFinite).filter((e) => e > 0);
	console.log(`Min: ${mathjs.min(allTimes)}`);
	console.log(`Max: ${mathjs.max(allTimes)}`);
	console.log(`Mean: ${mathjs.mean(allTimes)}`);
	console.log(`Median: ${mathjs.median(allTimes)}`);
	console.log(`Std: ${mathjs.std(allTimes)}`);
	console.log(JSON.stringify(blockAverages));
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((err) => console.log(err));
