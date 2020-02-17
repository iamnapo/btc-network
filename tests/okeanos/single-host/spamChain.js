require("dotenv").config();
const Client = require("bitcoin-core");
const Chance = require("chance");
const mongoose = require("mongoose");

const createTxs = require("./createTxs");
const Block = require("../../models/Block");

const chance = new Chance();
const NODES = [
	18401,
	18402,
	18403,
	18404,
	18405,
	18406,
	18407,
	18408,
	18409,
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
	for (let i = 0; i < 200; i += 1) {
		const { txCreator } = await createTxs();
		const blockCreator = chance.pickone(NODES);
		const client = new Client({ host: "localhost", port: blockCreator, username: "btc", password: "btc" });

		const startTime = process.hrtime();
		const [blockHash] = await client.generateToAddress(1, ADDRESSES[NODES.indexOf(txCreator)]);
		const minedAt = Date.now();
		const endTime = process.hrtime(startTime);
		const { nTx, height } = await client.getBlock(blockHash);
		console.log(i + 1, height);
		const millisToMine = ((endTime[0] * 1e9) + endTime[1]) / 1e6;
		await Block.create({ height, nTx, minedAt, blockHash, millisToMine, minerNode: NODES.indexOf(blockCreator) + 1 });

		// Hack to avoid soft-forks
		await new Promise((r) => setTimeout(r, 1000 * 4));
	}
})().then(() => { console.log("Done!\n"); process.exit(0); }).catch((error) => console.log(error) || process.exit(1));
