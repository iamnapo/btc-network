const mongoose = require("mongoose");
const mathjs = require("mathjs");

const Block = require("./models/Block");

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: 100,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost:27017/btc-network-limit-5", mongooseOptions);

(async () => {
  const blocks = await Block.find().exec();
  const allTimes = blocks.reduce((all, cur) => all.concat(cur.arrivedAfterMillis), []).filter((e) => Number.isFinite(e));
  console.log(`Min: ${mathjs.min(allTimes)}`);
  console.log(`Max: ${mathjs.max(allTimes)}`);
  console.log(`Mean: ${mathjs.mean(allTimes)}`);
  console.log(`Median: ${mathjs.median(allTimes)}`);
  console.log(`Std: ${mathjs.std(allTimes)}`);
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((err) => console.log(err));
