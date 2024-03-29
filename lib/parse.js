import { readFile } from "node:fs/promises";

import defaultConfig from "./config.js";

const parse = async ({ consensusH: userConsensusH = {}, chainparamsCPP: userChainParamsCPP = {} } = {}) => {
	const consensusH = { ...defaultConfig.consensusH, ...userConsensusH };
	const chainparamsCPP = { ...defaultConfig.chainparamsCPP, ...userChainParamsCPP };

	let consensusHFile = await readFile(new URL("consensus.h", import.meta.url), "utf8");
	let chainparamsCPPFile = await readFile(new URL("chainparams.cpp", import.meta.url), "utf8");

	for (const key of Object.keys(consensusH)) {
		const regex = `${key} = (\\d.*(?=;))`;
		consensusHFile = consensusHFile.replace(new RegExp(regex), `${key} = ${consensusH[key]}`);
	}

	chainparamsCPPFile = chainparamsCPPFile.split("\n").reverse().join("\n");
	for (const key of Object.keys(chainparamsCPP)) {
		const regex1 = `consensus.${key} = (\\d.*(?=;))`;
		const regex2 = `consensus.${key} = (uint256S\\(.*\\)(?=;))`;
		chainparamsCPPFile = chainparamsCPPFile.replace(new RegExp(regex1), `consensus.${key} = ${chainparamsCPP[key]}`);
		chainparamsCPPFile = chainparamsCPPFile.replace(new RegExp(regex2), `consensus.${key} = ${chainparamsCPP[key]}`);
	}

	chainparamsCPPFile = chainparamsCPPFile.split("\n").reverse().join("\n");

	return ({ consensusHFile, chainparamsCPPFile });
};

export default parse;
