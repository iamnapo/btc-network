/* eslint-disable no-loop-func, no-unused-vars */
const Client = require("bitcoin-core");
const Chance = require("chance");

const chance = new Chance();

const NODES_PORTS = [18401, 18402, 18403, 18404];
const ADDRESSES = [
  "2N7eLivAYENZP4ap6bFyKG1oYyJcN5dzG64",
  "2MtaWEQv96FS5Mw2x9sArSDyW1jfmwSs3a4",
  "2N7ozwfUzfYPZbQFDxSCyvKrjRBMBBTveEB",
  "2N8789Pw9ovK5UXWxGwxgtZGZxM43B4zmLJ",
];

module.exports = async () => {
  const txCreator = chance.pickone(NODES_PORTS);
  const numOfTxs = chance.integer({ min: 1, max: 50 });
  const receiverAddr = chance.pickone(ADDRESSES);
  const client = new Client({ port: txCreator, username: "btc", password: "btc", version: "0.18.0" });
  const numOfBatches = Math.trunc(numOfTxs / 16);

  const startTime = process.hrtime();
  for (const i of Array(numOfBatches).keys()) {
    await Promise.all([...Array(16)].map(() => client.sendToAddress(receiverAddr, 0.00006)));
  }
  const endTime = process.hrtime(startTime);
  const millisToCreateTxs = ((endTime[0] * 1e9) + endTime[1]) / 1e6;

  return { txCreator, millisToCreateTxs };
};
