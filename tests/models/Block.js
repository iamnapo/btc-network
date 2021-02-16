import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
	{
		height: { type: Number, required: true },
		nTx: { type: Number, required: true },
		minedAt: { type: Number, required: true },
		blockHash: { type: String, required: true },
		millisToMine: { type: Number, required: true },
		minerNode: { type: Number, required: true },
		arrivedAfterMillis: { type: Array },
	},
	{ timestamps: true },
);

export default mongoose.model("Block", blockSchema);
