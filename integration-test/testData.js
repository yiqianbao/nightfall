const {
	generateSalt,
	generateTokenID,
	numberToHexString
} = require('./utils');


module.exports = {
	alice: {
		name: "alice1",
		email: "alice@ey.com",
		password: "pass",
	},
	bob: {
		name: "bob",
		email: "bob@ey.com",
		password: "pass",
	},
	erc721: {
		tokenURI: "one",
		tokenID: generateTokenID(),
	},
	erc20: {
		mint: 5,
		toBeMintedAsCommitment: [2, 3],
		transfer: 4,
	},
};

(function () {
	this.erc721Commitment = {
		uri: this.erc721.tokenURI,
	  tokenID: this.erc721.tokenID,
	  S_A: generateSalt(), // salt while mint
	  S_B: generateSalt(), //  salt while transfer
	};
	this.erc20Commitments = [
		{
			A: numberToHexString(this.erc20.toBeMintedAsCommitment[0]),
			S_A: generateSalt(), // salt while mint
		},
		{
			A: numberToHexString(this.erc20.toBeMintedAsCommitment[1]),
			S_A: generateSalt(), // salt while mint
		}
	];
	this.erc20CommitmentToTransfer = {
		value: numberToHexString(this.erc20.transfer),
		S_E: generateSalt(),
	};
	this.erc20CommitmentChange = {
		value: numberToHexString(this.erc20.mint - this.erc20.transfer),
		S_F: generateSalt(),
	};
	this.erc20.change = (this.erc20.toBeMintedAsCommitment[0] + this.erc20.toBeMintedAsCommitment[1]) - this.erc20.transfer;
}).call(module.exports);
