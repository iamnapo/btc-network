import Client from "bitcoin-core";
import Chance from "chance";

const chance = new Chance();

const NODES = [
	18_401,
	18_402,
	18_403,
	18_404,
	18_405,
	18_406,
	18_407,
	18_408,
	18_409,
];
const ADDRESSES = [
	"2N2ehpH3BqLgAHq9tmiY8Ua5ej3wdzgk7SL",
	"2NEZd6o4NoVbWHy5KVYG3vhx8t1tu4Kg3c4",
	"2NBhSA8weHUPdg62R4mNLFTAfM8NaUSnjKz",
	"2MyteWeCjzgiRENxUcUepfagKPtfDEccN1d",
	"2N8uAgimxwAMquHUtU3uoA9fNEws8rx9kFS",
	"2N2QkxgwGm11qKMW2n27KuiFFUzHVX5hqdZ",
	"2N1LreRLf9KCmnQmumFwjyADuTh9aEaf9U5",
	"2MuSjBbtNLHefWGxgYj3bZikGBch2qiSaYD",
	"2MyvZyPuuxrDm3kbxGtUyiyLrfc8q8yfdGc",
];

const createTxs = async () => {
	const txCreator = chance.pickone(NODES);
	const numOfTxs = chance.integer({ min: 1, max: 50 });
	const receiverAddr = ADDRESSES[NODES.indexOf(txCreator)];
	const client = new Client({ host: "localhost", port: txCreator, username: "btc", password: "btc", version: "0.18.0" });
	const numOfBatches = Math.trunc(numOfTxs / 16);

	const startTime = process.hrtime();
	for (let i = 0; i < numOfBatches; i += 1) {
		await Promise.all(Array.from({ length: 16 }).map(() => client.sendToAddress(receiverAddr, 0.000_06)));
	}

	const endTime = process.hrtime(startTime);
	const millisToCreateTxs = ((endTime[0] * 1e9) + endTime[1]) / 1e6;

	return { txCreator, millisToCreateTxs };
};

export default createTxs;
