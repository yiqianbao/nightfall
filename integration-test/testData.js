const utils = require('../zkp-utils')('../config/stats');
const config = require('config');

const { rndHex, padHex } = utils;
const HASHLENGTH = config.get('HASHLENGTH');


const generateSalt = async () => await rndHex(HASHLENGTH);
const generateTokenID = async () => await rndHex(32);
const numberToHexString = int => padHex(int, 128);

// test data.
module.exports.testData = {
	alice: {
		name: 'alice1',
		email: 'alice@ey.com',
		password: 'pass',
    get pk () {
      return utils.hash(this.sk); // sk get set at login test suit
    },
	},
	bob: {
		name: 'bob',
		email: 'bob@ey.com',
		password: 'pass',
    get pk () {
      return utils.hash(this.sk); // sk get set at login test suit
    },
	},
	erc721: {
		tokenURI: 'one',
    tokenID: generateTokenID()
  },
	erc20: {
		mint: 5,
		toBeMintedAsCommitment: [2, 3],
		transfer: 4,
    get change () {
      return this.toBeMintedAsCommitment.reduce((a, b) => a + b, - this.transfer)
    }
	},
  erc721Commitment: async function () {
    const {
      alice,
      bob,
      erc721
    } = this;

    erc721.tokenID = await erc721.tokenID;
    return {
      uri: erc721.tokenURI,
      tokenID: erc721.tokenID,
      S_A: await generateSalt(), // salt while mint
      S_B: await generateSalt(), //  salt while transfer
      mintCommitmentIndex: '0',
      transferCommitmentIndex: '1',
      get mintCommitment () { //commitment while mint
        return utils.recursiveHashConcat(
          utils.strip0x(this.tokenID).slice(-(HASHLENGTH * 2)),
          alice.pk,
          this.S_A,
        );
      },
      get transferCommitment () { // commitment while transfer
        return utils.recursiveHashConcat(
          utils.strip0x(this.tokenID).slice(-(HASHLENGTH * 2)),
          bob.pk,
          this.S_B,
        );
      },
    }
  },
  erc20Commitments: async function () {
    const {
      alice,
      bob,
      erc20
    } = this;

    return {
      mint: [{
        A: numberToHexString(erc20.toBeMintedAsCommitment[0]),
        S_A: await generateSalt(), // salt, used while mint
        commitmentIndex: 0,
        get commitment () {
          return utils.recursiveHashConcat(
            this.A,
            alice.pk,
            this.S_A
          );
        },
      },
      {
        A: numberToHexString(erc20.toBeMintedAsCommitment[1]),
        S_A: await generateSalt(), // salt, used while mint
        commitmentIndex: 1,
        get commitment () {
          return utils.recursiveHashConcat(
            this.A,
            alice.pk,
            this.S_A
          );
        },
      }],
      transfer: {
        value: numberToHexString(erc20.transfer),
        S_E: await generateSalt(),
        commitmentIndex: 2,
        get commitment () {
          return utils.recursiveHashConcat(
            this.value,
            bob.pk,
            this.S_E
          );
        },
      },
      change: {
        value: numberToHexString(erc20.change),
        S_F: await generateSalt(),
        commitmentIndex: 3,
        get commitment () {
          return utils.recursiveHashConcat(
            this.value,
            alice.pk,
            this.S_F
          );
        },
      }
    }
  }
};

/*
*  a function which will configure dependent test data.
*/
module.exports.configureDependentTestData = (async function () {
  this.erc721Commitment = await this.erc721Commitment();
  this.erc20Commitments = await this.erc20Commitments();
}).bind(module.exports.testData)
