require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

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

mongoose.connect(process.env.DB_URI, mongooseOptions);

(async () => {
	const logFile = fs.readFileSync(path.join(__dirname, "./logs.txt"), "utf8").split("\n");
	const blocks = await Block.find().exec();
	// const blocks = await Block.deleteMany({ $where: "this.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length === 1" }).exec();
	logFile.forEach((line) => {
		try {
			const blockHash = line.match(/best=(\w.*(?= h))/)[1];
			const arrivedAtNode = Number.parseInt(line.match(/^node(\d.*(?=_1))/)[1] - 1, 10);
			const arrivedAt = moment(line.match(/\| (\w.*?(?= ))/)[1]).valueOf();
			const block = blocks.find((e) => e.blockHash === blockHash);
			if (block) {
				block.arrivedAfterMillis[arrivedAtNode] = Math.max(arrivedAt - block.minedAt, block.arrivedAfterMillis[arrivedAtNode] || 0);
			}
		} catch (error) {
			console.log(line);
		}
	});
	let count = 0;
	await Promise.all(blocks.map((e) => {
		if (e.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length !== 4) count += 1;
		e.markModified("arrivedAfterMillis");
		return e.save();
	}));
	console.log(count);
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((error) => console.error(error));
