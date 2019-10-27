const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

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

mongoose.connect("mongodb://localhost:27017/btc-network", mongooseOptions);

(async () => {
  const logFile = fs.readFileSync(path.join(__dirname, "./logs.txt"), "utf8").split("\n");
  const blocks = await Block.find().exec();
  for (const fullLine of logFile) {
    const line = fullLine.split(" ");
    if (line.length !== 14) continue; // eslint-disable-line no-continue
    const blockHash = line[6].slice(5);
    const arrivedAtNode = parseInt(line[0][4] - 1, 10);
    const arrivedAt = moment(line[3]).valueOf();
    const block = blocks.find((e) => e.blockHash === blockHash);
    if (block) {
      block.arrivedAfterMillis[arrivedAtNode] = Math.max(arrivedAt - block.minedAt, block.arrivedAfterMillis[arrivedAtNode] || 0);
    }
  }
  await Promise.all(blocks.map((e) => {
    if (e.arrivedAfterMillis.filter((el) => Number.isFinite(el)).length !== 4) return e.remove();
    e.markModified("arrivedAfterMillis");
    return e.save();
  }));
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((err) => console.log(err));
