/* eslint-disable import/no-commonjs */

import Response from './response/response';
import AccountService from '../business/accounts.service';
import CoinService from '../business/coin.service';
import TokenService from '../business/token.service';

/**
 * this function is used to add ERC-20 Contract related information in user table, such as contract addresses,
    account address to which user hold ERC-20 token and password of that account address used to unlock account.
 * req.body = {
        contract_address,
        account_address,
        account_password
    }
 * @param {*} req
 * @param {*} res
 */
const addCoinShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.addCoinShieldContractAddress(req.body);
    const response = new Response(200, { message: 'Contract Information Added' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * this function is used to remove ERC-20 contract related information from user table
 * req.query = {
        contract_address
    }
 * @param {*} req
 * @param {*} res
 */
const deleteCoinShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const status = await accountService.deleteCoinShieldContractAddress(req.query);
    const response = new Response(200, { message: 'Contract Information Removed', status }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * this function is used to update ERC-20 Contract related information in user table, such as contract addresses,
    account address to which user hold ERC-20 token and password of that account address used to unlock account.
 * req.body = {
        contract_address,
        account_address,
        account_password
    }
 * @param {*} req
 * @param {*} res
 */
const updateCoinShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.updateCoinShieldContractAddress(req.body);
    const response = new Response(200, { message: 'Contract Information Updated' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * this function is used to add ERC-721 contract related information in user table, such as contract addresses,
    account address to which user hold ERC-721 token and password of that account address used to unlock account.
 * req.body = {
        contract_address,
        account_address,
        account_password
    }
 * @param {*} req
 * @param {*} res
 */
const addTokenShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.addTokenShieldContractAddress(req.body);
    const response = new Response(200, { message: 'Contract Information Added' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * this function is used to remove ERC-721 contract related information from user table
 * req.query = {
        contract_address
    }
 * @param {*} req
 * @param {*} res
 */
const deleteTokenShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const status = await accountService.deleteTokenShieldContractAddress(req.query);
    const response = new Response(200, { message: 'Contract Information Removed', status }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * this function is used to update ERC-721 Contract related information in user table, such as contract addresses,
    account address to which user hold ERC-721 token and password of that account address used to unlock account.
 * req.body = {
        contract_address,
        account_address,
        account_password
    }
 * @param {*} req
 * @param {*} res
 */
const updateTokenShieldContractAddress = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.updateTokenShieldContractAddress(req.body);
    const response = new Response(200, { message: 'Contract Information Updated' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This method called at login, assigning new whisper key in user at db.
 *
 * @param {*} req
 * @param {*} res
 */
const updateWhisperIdentity = async (req, res, next) => {
  const { shhIdentity } = req.body;
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.updateWhisperIdentity(shhIdentity);
    const response = new Response(200, { message: 'Whisper-key updated' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This method fetch whisper key associated with user.
 *
 * @param {*} req
 * @param {*} res
 */
const getWhisperIdentity = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const keys = await accountService.getWhisperIdentity();
    const response = new Response(200, { ...keys }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This function is used to get account balances
 * @param {*} req
 * @param {*} res
 */
const getCountHandler = async (req, res, next) => {
  const tokenService = new TokenService(req.user.db);
  const coinService = new CoinService(req.user.db);
  try {
    const tokens = await tokenService.getToken();
    const coins = await coinService.getCoinByAccount();
    const coinList = coins.data;
    let totalAmount = 0;
    if (coinList.length) {
      coinList.forEach(coin => {
        totalAmount += Number(coin.coin_value);
      });
    }
    const data = { tokenCount: tokens ? tokens.length : 0, totalAmount };
    const response = new Response(200, data, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This function is used to fetch user by name (login purpose).
 * req.body = { name: 'a' }
 * @param {*} req
 * @param {*} res
 */
const getUserByName = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const data = await accountService.getUser({ name: req.body.name });
    const response = new Response(200, data, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This function will create a user(public ethereum account)
 * req.body = { name: 'a',
                email: 'a',
                idAuditor: false,
                address: '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' => Ethereum account
            }
 * @param {*} req
 * @param {*} res
 */
const createAccountHandler = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const data = await accountService.createAccount(req.body);
    const response = new Response(200, data, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This function is used to create private account for a user
 * req.body = { address: '0x256140f466b2e56E3ae0055551591FE46664976d', // this is the newly created private account
                password: '1535612512928'                              // and its password
            }
    req.headers.address = '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' // this is user public account
 * @param {*} req
 * @param {*} res
 */
const createPrivateAccountHandler = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const data = await accountService.updateUserWithPrivateAccount(req.body);
    const response = new Response(200, data, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

/**
 * This function is used to get the user using public key
 * req.query = { pk_B: "0x48741c46eada3492"}
 * @param {*} req
 * @param {*} res
 */
const getUserHandler = async (req, res, next) => {
  const accountService = new AccountService(req.user.db);
  try {
    const data = await accountService.getUser();
    const response = new Response(200, data, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, { message: err.message });
    res.status(500).json(response);
    next(err);
  }
};

// initializing routes
exports.init = router => {
  // Route to get user by name, also use while login
  router.route('/login').post(getUserByName);

  // Route to create a public Account
  router.route('/createAccount').post(createAccountHandler);

  // Route to create a private account & get private account
  router.route('/privateAccount').post(createPrivateAccountHandler);

  // Route to get a user
  router.route('/user').get(getUserHandler);

  router.route('/count').get(getCountHandler);

  router
    .route('/user/whisperIdentity')
    .get(getWhisperIdentity)
    .patch(updateWhisperIdentity);

  router
    .route('/user/coinShield')
    .post(addCoinShieldContractAddress)
    .put(updateCoinShieldContractAddress)
    .delete(deleteCoinShieldContractAddress);

  router
    .route('/user/tokenShield')
    .post(addTokenShieldContractAddress)
    .put(updateTokenShieldContractAddress)
    .delete(deleteTokenShieldContractAddress);
};
