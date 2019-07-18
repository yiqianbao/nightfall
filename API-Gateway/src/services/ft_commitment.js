import { whisperTransaction } from './whisper';

const _ = require('underscore');
const zkp = require('../rest/zkp');
const db = require('../rest/db');
const Response = require('../routes/response/response');
const accounts = require('../rest/accounts');
const offchain = require('../rest/offchain');

export async function checkCorrectnessCoin(req, res, next) {
  const response = new Response();

  try {
    const { data } = await zkp.checkCorrectnessCoin(req.headers, req.body);

    response.statusCode = 200;
    response.data = data;
    res.json(response);
  } catch (err) {
    response.statusCode = 500;
    response.data = err;
    res.status(500).json(response);
    next(err);
  }
}

// ERC-20 commitment
/**
	 * This function will mint a coin and add transaction in db
	 * req.user {
	 		address: '0x3bd5ae4b9ae233843d9ccd30b16d3dbc0acc5b7f',
			name: 'alice',
			pk_A: '0x70dd53411043c9ff4711ba6b6c779cec028bd43e6f525a25af36b8',
			password: 'alicesPassword'
		}
	 * req.body {
	 		A: '0x00000000000000000000000000002710',
		  S_A: '0x14DE022C9B4A437B346F04646BD7809DEB81C38288E9614478351D'
		}
	 * @param {*} req
	 * @param {*} res
	 */
export async function mintCoin(req, res, next) {
  const response = new Response();

  try {
    const { data } = await zkp.mintCoin(req.user, {
      A: req.body.A,
      pk_A: req.user.pk_A
    });

    data.coin_index = parseInt(data.coin_index, 16);
    data.action_type = 'minted';

    await db.addCoin(
      _.extend(req.body, data, {
        account: req.user.address,
        name: req.user.name,
        pk_A: req.user.pk_A,
      }),
    );

    response.statusCode = 200;
    response.data = data;
    res.json(response);
  } catch (err) {
    response.statusCode = 500;
    response.data = err;
    res.status(500).json(response);
    next(err);
  }
}

/**
     * This function will transfer a coin and update db
     * req.user {
         address: '0x3bd5ae4b9ae233843d9ccd30b16d3dbc0acc5b7f',
        name: 'alice',
        pk_A: '0x70dd53411043c9ff4711ba6b6c779cec028bd43e6f525a25af36b8',
        password: 'alicesPassword'
      }
     * req.body {
         C: '0x00000000000000000000000000002710',
          D: '0x00000000000000000000000000001388',
        E: '0x00000000000000000000000000001770',
        F: '0x00000000000000000000000000002328',
        S_C: '0x14de022c9b4a437b346f04646bd7809deb81c38288e9614478351d',
        S_D: '0xdd22d29b452a36d4f9fc3b2ad00e9034cc0a4175b52aa35fb7cd92',
        z_C_index: 0,
        z_D_index: 1,
        S_E: '0xEDCE5B0A6607149ECC1293F721924128ABFDCDE553506C792F3DA3',
        S_F: '0x4432C08959B75A846A2E50007B5FAC86B18446B910C67B0255BDE7',
        sk_A: '0x41ced159d5690ef0ccfe5742783057fc9eb12809af2f16f6f98ffd',
        z_C: '0x39aaa6fe40c2106f49f72c67bc24d377e180baf3fe211c5c90e254',
        z_D: '0x0ca8040181b3fc505eed1ee6892622054ae877ddf8f9dafe93b072',
        pk_A: '0x70dd53411043c9ff4711ba6b6c779cec028bd43e6f525a25af36b8',
        receiver_name: 'bob',
        pk_B: '0xd68df96f6cddd786290b57fcead37ea670dfe94634f553afeedfef'
      }
     * @param {*} req
     * @param {*} res
     */
export async function transferCoin(req, res, next) {
  const response = new Response();
  const userAddress = req.user.address;
  const userName = req.headers.name;

  try {
    const password = (req.user.address + Date.now()).toString();
    const address = (await accounts.createAccount(password)).data;
    await db.updateUserWithPrivateAccount(req.user, { address, password });
    await accounts.unlockAccount({ address, password });

    const { pk } = await offchain.getZkpPublicKeyFromName(req.body.receiver_name); // fetch pk from PKD by passing username
    req.body.pk_B = pk;
    req.body.pk_A = req.user.pk_A;

    const { data } = await zkp.transferCoin({ address }, req.body);
    data.z_E_index = parseInt(data.z_E_index, 16);
    data.z_F_index = parseInt(data.z_F_index, 16);

    req.body.action_type = 'transferred';

    const coinData = _.extend(req.body, data, {
      name: req.user.name,
    });

    await db.updateCoin(req.user, coinData);

    // note:
    // E is the value transferred to the transferee
    // F is the value returned as 'change' to the transferor
    await whisperTransaction(req, {
      E: req.body.E,
      S_E: data.S_E,
      pk: req.body.pk_B,
      z_E: data.z_E,
      z_E_index: data.z_E_index,
      transferee: req.body.receiver_name,
      for: 'coin',
    });

    response.statusCode = 200;
    response.data = data;
    res.json(response);
  } catch (err) {
    response.statusCode = 500;
    response.data = err;
    res.status(500).json(response);
    next(err);
  }
}

/**
     * This function will burn a coin
     * req.body {
      A: '0x00000000000000000000000000000001',
      sk_A: '0x283ccbfada111a31df7617deeff4d0daaa3f73b05ba100821d17cc',
      S_A: '0xa31adb1074f977413fddd3953e333529a3494e110251368cc823fb',
      z_A_index: 0,
      z_A: '0x1ec4a9b406fd3d79a01360ccd14c8530443ea9869f8e9560dafa56',
      payTo: 'bob',
     }
     * @param {*} req
     * @param {*} res
     */
export async function burnCoin(req, res, next) {
  const response = new Response();

  try {
    const payToAddress = (await offchain.getAddressFromName(req.body.payTo || req.user.name)).address;

    const { data } = await zkp.burnCoin({...req.body,  payTo: payToAddress }, req.user);
    data.action_type = 'burned';

    const senderAddress = req.user.address;
    await db.updateCoinForBurn(req.user, {
      ...req.body,
      ...data,
      account: senderAddress,
      receiver_name: (req.body.payTo || req.user.name)
    });

    const user = await db.fetchUser(req.user);

    if (req.body.payTo) {
      await whisperTransaction(req, {
        amount: Number(req.body.A),
        shield_contract_address: user.selected_coin_shield_contract,
        transferee: req.body.payTo,
        transferor: req.user.name,
        transferor_address: req.user.address,
        for: 'FToken',
      }); // send ft token data to BOB side
    } else {
      await db.addFTTransaction(req.user, {
        amount: Number(req.body.A),
        shield_contract_address: user.selected_coin_shield_contract,
        transferee: req.body.payTo,
        transferor: req.user.name,
        transferor_address: req.user.address,
        is_received: true,
      });
    }

    response.statusCode = 200;
    response.data = data;
    res.json(response);
  } catch (err) {
    console.log('error response burnCoin', err);
    response.statusCode = 500;
    response.data = err;
    res.status(500).json(response);
    next(err);
  }
}
