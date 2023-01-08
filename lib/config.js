const config = {
	consensusH: { // @bitcoin/src/consensus/consensus.h
		MAX_BLOCK_SERIALIZED_SIZE: 4_000_000,
		MAX_BLOCK_WEIGHT: 4_000_000,
		MAX_BLOCK_SIGOPS_COST: 80_000,
		COINBASE_MATURITY: 100,
		WITNESS_SCALE_FACTOR: 4,
		get MIN_TRANSACTION_WEIGHT() { return this.WITNESS_SCALE_FACTOR * 60; },
		get MIN_SERIALIZABLE_TRANSACTION_WEIGHT() { return this.WITNESS_SCALE_FACTOR * 10; },
		LOCKTIME_VERIFY_SEQUENCE: 1,
		LOCKTIME_MEDIAN_TIME_PAST: 2,
	},
	chainparamsCPP: { // @bitcoin/src/chainparams.cpp
		nSubsidyHalvingInterval: 150,
		BIP34Height: 500,
		BIP65Height: 1351,
		BIP66Height: 1251,
		CSVHeight: 432,
		SegwitHeight: 0,
		MinBIP9WarningHeight: 0,
		nPowTargetTimespan: 14 * 24 * 60 * 60,
		nPowTargetSpacing: 10 * 60,
		nRuleChangeActivationThreshold: 108,
		nMinerConfirmationWindow: 144,
		nMinimumChainWork: "uint256S(\"0x00\")",
		defaultAssumeValid: "uint256S(\"0x00\")",
		powLimit: "uint256S(\"7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\")",
	},
};

export default config;
