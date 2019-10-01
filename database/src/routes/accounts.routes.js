import { AccountService, NftCommitmentService, FtCommitmentService } from '../business';

/**
 * this function is used to add ERC-20 Contract related information in user table, such as contract addresses,
 * account address to which user hold ERC-20 token and password of that account address used to unlock account.
 * req.body = {
 *  contractAddress,
 *  accountAddress,
 *  accountPassword
 * }
 * @param {*} req
 * @param {*} res
 */
async function addCoinShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.addCoinShieldContractAddress(req.body);
    res.data = { message: 'Contract Information Added' };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * this function is used to remove ERC-20 contract related information from user table
 * req.query = {
 *  contractAddress
 * }
 * @param {*} req
 * @param {*} res
 */
async function deleteCoinShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    const status = await accountService.deleteCoinShieldContractAddress(req.query);
    res.data = { message: 'Contract Information Removed', status };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * this function is used to update ERC-20 Contract related information in user table, such as contract addresses,
 * account address to which user hold ERC-20 token and password of that account address used to unlock account.
 * req.body = {
 *  contractAddress,
 *  accountAddress,
 *  accountPassword
 * }
 * @param {*} req
 * @param {*} res
 */
async function updateCoinShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.updateCoinShieldContractAddress(req.body);
    res.data = { message: 'Contract Information Updated' };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * this function is used to add ERC-721 contract related information in user table, such as contract addresses,
 * account address to which user hold ERC-721 token and password of that account address used to unlock account.
 * req.body = {
 *  contractAddress,
 *  accountAddress,
 *  accountPassword
 * }
 * @param {*} req
 * @param {*} res
 */
async function addTokenShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.addTokenShieldContractAddress(req.body);
    res.data = { message: 'Contract Information Added' };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * this function is used to remove ERC-721 contract related information from user table
 * req.query = {
 *  contractAddress
 * }
 * @param {*} req
 * @param {*} res
 */
async function deleteTokenShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    const status = await accountService.deleteTokenShieldContractAddress(req.query);
    res.data = { message: 'Contract Information Removed', status };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * this function is used to update ERC-721 Contract related information in user table, such as contract addresses,
 * account address to which user hold ERC-721 token and password of that account address used to unlock account.
 * req.body = {
 *  contractAddress,
 *  accountAddress,
 *  accountPassword
 * }
 * @param {*} req
 * @param {*} res
 */
async function updateTokenShieldContractAddress(req, res, next) {
  const accountService = new AccountService(req.user.db);
  try {
    await accountService.updateTokenShieldContractAddress(req.body);
    res.data = { message: 'Contract Information Updated' };
    next();
  } catch (err) {
    next(err);
  }
}

// initializing routes
export default function(router) {
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
}
