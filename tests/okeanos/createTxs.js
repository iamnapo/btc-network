const Client = require("bitcoin-core");
const Chance = require("chance");

const chance = new Chance();

const NODES = [
	"snf-872411.vm.okeanos.grnet.gr",
	"snf-872412.vm.okeanos.grnet.gr",
	"snf-872414.vm.okeanos.grnet.gr",
	"snf-872415.vm.okeanos.grnet.gr",
	"snf-872416.vm.okeanos.grnet.gr",
	"snf-872433.vm.okeanos.grnet.gr",
	"snf-872783.vm.okeanos.grnet.gr",
	"snf-872784.vm.okeanos.grnet.gr",
	"snf-872785.vm.okeanos.grnet.gr",
	"snf-872786.vm.okeanos.grnet.gr",
	"snf-872787.vm.okeanos.grnet.gr",
	"snf-872788.vm.okeanos.grnet.gr",
	"snf-872789.vm.okeanos.grnet.gr",
	"snf-872790.vm.okeanos.grnet.gr",
	"snf-872791.vm.okeanos.grnet.gr",
	"snf-872792.vm.okeanos.grnet.gr",
	"snf-872793.vm.okeanos.grnet.gr",
	"snf-872794.vm.okeanos.grnet.gr",
	"snf-872795.vm.okeanos.grnet.gr",
	"snf-872796.vm.okeanos.grnet.gr",
];
const ADDRESSES = [
	"2NDRfqQM9QC5SEUhoTLz8oHuuysuW4WceuM",
	"2NDM6ngrBk2phLcWNLe1pwJePazcsHQ33Y3",
	"2N7zwvvGNPdoytHFP3BLzKLxtNc5UfXeqMV",
	"2MztDDSTfaVogEV2yT1h4sEwm5BD2D7NxAh",
	"2MzauPG1QFSh3vn3eXe5kC3MMvinhuht1J3",
	"2N3X7JeqeDZaLMkhK9LHjukxCEpCpwm9hKh",
	"2N6tKLkPW8xbPJq55UnQzYo9vHtj6GnZB8m",
	"2Mtqz7aUJ3FzG43DLr9GZ2ZjSbLmFJNgR4j",
	"2NF7DNtqLm9KwRZ4ii8ZtSjac6Ts41yen59",
	"2N6WrmSXbizzsBE5tbgTTj9Rg3fBqBUx5eN",
	"2MzqtgTms3kmCUSi9UmkJxW8Ad5QY1haYES",
	"2N9xxXNpJ5zzxVxY8uoprCYoCEyHGwwj5d9",
	"2MtfEEfCVG3wBhyhyCmjfUo8kSK94KN5shF",
	"2N1geRgVDQb7CD2SexyTvzqqBUgiiuRg7gi",
	"2N2bducry62xsEuELdAmewttcCwqn17nTH5",
	"2NEn5zoAvDFYYFeFTunM9SzWfJaaviUeN2g",
	"2NDkgstL8BJv8dVUGejNEUCKcYhZTevKD8G",
	"2MtxjWiJyzEfGHrF9qY8rCUUn5oej83hsxo",
	"2N1dAbTKyqeM8G6fjokewXNcY49bQYhTmbK",
	"2NDiiK92ddFuGcDRuEcZ9nYUZ19KMBnMEAx",
];

module.exports = async () => {
	const txCreator = chance.pickone(NODES);
	const numOfTxs = chance.integer({ min: 1, max: 50 });
	const receiverAddr = chance.pickone(ADDRESSES);
	const client = new Client({ host: txCreator, port: 18401, username: "btc", password: "btc", version: "0.18.0" });
	const numOfBatches = Math.trunc(numOfTxs / 16);

	const startTime = process.hrtime();
	for (let i = 0; i < numOfBatches; i += 1) {
		await Promise.all([...Array(16)].map(() => client.sendToAddress(receiverAddr, 0.00006)));
	}
	const endTime = process.hrtime(startTime);
	const millisToCreateTxs = ((endTime[0] * 1e9) + endTime[1]) / 1e6;

	return { txCreator, millisToCreateTxs };
};
