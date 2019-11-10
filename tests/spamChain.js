/* eslint-disable no-unused-vars */
const Client = require("bitcoin-core");
const Chance = require("chance");
const mongoose = require("mongoose");

const createTxs = require("./createTxs");
const Block = require("./models/Block");

const chance = new Chance();
const NODES_PORTS = [18401, 18402, 18403, 18404];
const ADDRESSES = [
  "2N7eLivAYENZP4ap6bFyKG1oYyJcN5dzG64",
  "2MtaWEQv96FS5Mw2x9sArSDyW1jfmwSs3a4",
  "2N7ozwfUzfYPZbQFDxSCyvKrjRBMBBTveEB",
  "2N8789Pw9ovK5UXWxGwxgtZGZxM43B4zmLJ",
];

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
  for (const i of Array(50).keys()) {
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
  }
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((err) => console.log(err));
