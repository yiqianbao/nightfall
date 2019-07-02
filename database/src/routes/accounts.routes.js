let Response = require('./response/response')
let AccountService = require('../business/accounts.service')
let CoinService = require('../business/coin.service')
let TokenService = require('../business/token.service')


// initializing routes
exports.init = router => {
    // Route to get user by name, also use while login
    router.route('/login').post(getUserByName)

    // Route to create a public Account
    router.route('/createAccount').post(createAccountHandler)

    // Route to create a private account & get private account
    router.route('/privateAccount').post(createPrivateAccountHandler)

    // Route to get a user
    router.route('/user').get(getUserHandler)

    router.route('/count').get(getCountHandler)

    router.route('/user/whisperIdentity')
        .get(getWhisperIdentity)
        .patch(updateWhisperIdentity);

    router.route('/user/coinShield')
        .post(addCoinShieldContractAddress)
        .put(updateCoinShieldContractAddress)
        .delete(deleteCoinShieldContractAddress)

    router.route('/user/tokenShield')
        .post(addTokenShieldContractAddress)
        .put(updateTokenShieldContractAddress)
        .delete(deleteTokenShieldContractAddress)
};



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
let addCoinShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        await accountService.addCoinShieldContractAddress(req.body);
        let response = new Response(200, {message: "Contract Information Added"}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


/**
 * this function is used to remove ERC-20 contract related information from user table
 * req.query = {
        contract_address
    }
 * @param {*} req
 * @param {*} res
 */
let deleteCoinShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        const status = await accountService.deleteCoinShieldContractAddress(req.query);
        let response = new Response(200, {message: "Contract Information Removed", status}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


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
let updateCoinShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        await accountService.updateCoinShieldContractAddress(req.body);
        let response = new Response(200, {message: "Contract Information Updated"}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


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
let addTokenShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        await accountService.addTokenShieldContractAddress(req.body);
        let response = new Response(200, {message: "Contract Information Added"}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


/**
 * this function is used to remove ERC-721 contract related information from user table
 * req.query = {
        contract_address
    }
 * @param {*} req
 * @param {*} res
 */
let deleteTokenShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        const status = await accountService.deleteTokenShieldContractAddress(req.query);
        let response = new Response(200, {message: "Contract Information Removed", status}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


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
let updateTokenShieldContractAddress = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        await accountService.updateTokenShieldContractAddress(req.body);
        let response = new Response(200, {message: "Contract Information Updated"}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


/**
 * This method called at login, assigning new whisper key in user at db.
 *
 * @param {*} req
 * @param {*} res
 */
let updateWhisperIdentity = async (req, res, next) => {
    const {shhIdentity} = req.body;
    const accountService = new AccountService(req.user.db);
    try {
        await accountService.updateWhisperIdentity(shhIdentity);
        let response = new Response(200, {message: "Whisper-key updated"}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


/**
 * This method fetch whisper key associated with user.
 *
 * @param {*} req
 * @param {*} res
 */
let getWhisperIdentity = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try {
        let keys = await accountService.getWhisperIdentity();
        let response = new Response(200, {...keys}, null);
        res.json(response);
    } catch (err) {
        let response = new Response(500, null, {message: err.message});
        res.status(500).json(response);
        next(err);
    }
}


/**
 * This function is used to get account balances
 * @param {*} req
 * @param {*} res
 */
let getCountHandler = async (req, res, next) => {
    const tokenService = new TokenService(req.user.db);
    const coinService = new CoinService(req.user.db);
    try{
        let tokens  = await tokenService.getToken();
        let coins = await coinService.getCoinByAccount();
        let coinList = coins.data;
        let totalAmount = 0;
        if(coinList.length){
            coinList.forEach(coin => {
                totalAmount += Number(coin.coin_value)
            });
        }
        let data = { tokenCount:  tokens ? tokens.length : 0, totalAmount }
        let response = new Response(200, data, null)
        res.json(response)
    }catch(err){
        let response = new Response(500, null, {message: err.message})
        res.status(500).json(response)
        next(err)
    }
}


/**
 * This function is used to fetch user by name (login purpose).
 * req.body = { name: 'a' }
 * @param {*} req
 * @param {*} res
 */
let getUserByName = async (req, res, next) => {
    const accountService = new AccountService(req.user.db)
    try{
        let data = await accountService.getUser({name: req.body.name})
        let response = new Response(200, data, null)
        res.json(response)
    }catch(err) {
        let response = new Response(500, null, {message: err.message})
        res.status(500).json(response)
        next(err)
    }
}


/**
 * This function will create a user(public ethereum account)
 * req.body = { name: 'a',
                email: 'a',
                address: '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' => Ethereum account
            }
 * @param {*} req
 * @param {*} res
 */
let createAccountHandler =  async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try{
        let data = await accountService.createAccount(req.body)
        let response = new Response(200, data, null)
        res.json(response)
    }catch(err){
        let response = new Response(500, null, {message: err.message})
        res.status(500).json(response)
        next(err);
    }
}


/**
 * This function is used to create private account for a user
 * req.body = { address: '0x256140f466b2e56E3ae0055551591FE46664976d', // this is the newly created private account
                password: '1535612512928'                              // and its password
            }
    req.headers.address = '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' // this is user public account
 * @param {*} req
 * @param {*} res
 */
let createPrivateAccountHandler = async (req, res, next) => {
    const accountService = new AccountService(req.user.db);
    try{
        let data = await accountService.updateUserWithPrivateAccount(req.body)
        let response = new Response(200, data, null)
        res.json(response)
    }catch(err){
        let response = new Response(500, null, {message: err.message})
        res.status(500).json(response)
        next(err);
    }
}


/**
 * This function is used to get the user using public key
 * req.query = { pk_B: "0x48741c46eada3492"}
 * @param {*} req
 * @param {*} res
 */
let getUserHandler = async (req, res, next) => {
     const accountService = new AccountService(req.user.db);
    try{
        let data = await accountService.getUser()
        let response = new Response(200, data, null)
        res.json(response)
    }catch(err){
        let response = new Response(500, null, {message: err.message})
        res.status(500).json(response)
        next(err)
    }
}
