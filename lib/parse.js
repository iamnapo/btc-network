const readFileAsync = require("util").promisify(require("fs").readFile);
const path = require("path");

const defaultConfig = require("./config");

module.exports = async (userConfig = { consensusH: {}, chainparamsCPP: {} }) => {
	const consensusH = { ...defaultConfig.consensusH, ...userConfig.consensusH };
	const chainparamsCPP = { ...defaultConfig.chainparamsCPP, ...userConfig.chainparamsCPP };

	let consensusHFile = (await readFileAsync(path.join(__dirname, "consensus.h"), "utf8")).toString();
	let chainparamsCPPFile = (await readFileAsync(path.join(__dirname, "chainparams.cpp"), "utf8")).toString();

	Object.keys(consensusH).forEach((key) => {
		const regex = `${key} = (\\d.*(?=;))`;
		consensusHFile = consensusHFile.replace(new RegExp(regex), `${key} = ${consensusH[key]}`);
	});

	chainparamsCPPFile = chainparamsCPPFile.split("\n").reverse().join("\n");
	Object.keys(chainparamsCPP).forEach((key) => {
		const regex1 = `consensus.${key} = (\\d.*(?=;))`;
		const regex2 = `consensus.${key} = (uint256S\\(.*\\)(?=;))`;
		chainparamsCPPFile = chainparamsCPPFile.replace(new RegExp(regex1), `consensus.${key} = ${chainparamsCPP[key]}`);
		chainparamsCPPFile = chainparamsCPPFile.replace(new RegExp(regex2), `consensus.${key} = ${chainparamsCPP[key]}`);
	});
	chainparamsCPPFile = chainparamsCPPFile.split("\n").reverse().join("\n");

	return ({ consensusHFile, chainparamsCPPFile });
};
