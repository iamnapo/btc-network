import Client from "bitcoin-core";
import Chance from "chance";

const chance = new Chance();

const NODES_PORTS = [18_401, 18_402, 18_403, 18_404];
const ADDRESSES = [
	"2N5TFopmSQ7C4UVsBJEnBoToZKtrRoUyXs7",
	"2NDckBMqJLRyWuVB2vnutAJSczCFUVN3tRv",
	"2N5ofhsCfVKvianzc7xVvBuym362rAcXPeG",
	"2N4XRLtrNCx3n8AYDjCKGqHn76SAAHFVjSY",
];

export default async () => {
	const txCreator = chance.pickone(NODES_PORTS);
	const numOfTxs = chance.integer({ min: 1, max: 50 });
	const receiverAddr = chance.pickone(ADDRESSES);
	const client = new Client({ port: txCreator, username: "btc", password: "btc", version: "0.18.0" });
	const numOfBatches = Math.trunc(numOfTxs / 16);

	const startTime = process.hrtime();
	for (let i = 0; i < numOfBatches; i += 1) {
		await Promise.all(Array.from({ length: 16 }).map(() => client.sendToAddress(receiverAddr, 0.000_06)));
	}
	const endTime = process.hrtime(startTime);
	const millisToCreateTxs = ((endTime[0] * 1e9) + endTime[1]) / 1e6;

	return { txCreator, millisToCreateTxs };
};
