let Response = require('./response/response')
let CoinService = require('../business/coin.service')
let accountsService = require('../business/accounts.service')


// initializing routes
exports.init = router => {
    // public fungible tokens
    router.route('/ft/transaction')
        .post(addFTTransaction)
        .get(getFTTransactions);


    // private fungible tokens
    router.route('/coin')
        .post(addCoinHandler)
        .get(getCoinHandler)
        .patch(updateCoinHandler);

    router.route('/coin/burn')
        .patch(burnCoinHandler)

    router.route('/coin/transaction')
        .get(getPrivateCoinTransactions);
}



// public fungible tokens
    /**
     * This function add ERC-20 transactions in database
     * req.body = {
        amount: 20,
        shield_contract_address: "0x033..",
        transferee: "BOB",
        transferee_address: "0xb0b",
        transferor: "ALICE",
        transferor_address: "0xA71CE"
     }
     * @param {*} req
     * @param {*} res
     */
    let addFTTransaction = async function (req, res, next) {
        try {
            const coinService = new CoinService(req.user.db);
            await coinService.addFTokenTransaction(req.body);
            let response = new Response(200, { message: "inserted" }, null)
            res.json(response)
        } catch (err) {
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err);
        }
    }


    /**
     * This function returns all the Coins transactions
     * req.query = { pageNo: 1, limit: 5}
     * @param {*} req
     * @param {*} res
     */
    let getFTTransactions = async function (req, res, next) {
        const coinService = new CoinService(req.user.db);
        try {
            const transactions = await coinService.getFTTransactions(req.query);
            let response = new Response(200, transactions, null)
            res.json(response)
        } catch (err) {
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err);
        }
    }



// private fungible tokens
    /**
     * This function is used to add a coin to the db.
     * req.body {
            A: '0x00000000000000000000000000000002',
            pk_A: '0xee75e30c839edadc4b83a2bb8b7bd9639b3fb56bae98b44d2408bb',
            S_A: '0x2149EA32C6839405C3A8461065554703D98B9DC921F88B99FF67AC',
            coin: '0x677d27d8e4af2ec2f5468b7c69a0501d7e925ee4d36de9d732f723',
            coin_index: '1',
            action_type: 'minted',
            account: '0x5fa9b72a39a691384749308ff75d0f5e0a6afd5d',
            name: 'jose'
        }
     * @param {*} req
     * @param {*} res
     */
    let addCoinHandler = async function (req, res, next) {
        try {
            const coinService = new CoinService(req.user.db);

            let toSave = req.body.toSave;
            if(toSave ==='receiverSide'){
                await coinService.addNewCoinOnReceiverSide(req.body);
            }else{
                await coinService.addNewCoin(req.body);
            }

            let response = new Response(200, { message: "inserted" }, null)
            res.json(response)

        } catch (err) {
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err)
        }
    }


    /**
     * This function is used to get coins associated with an public account
     * @param {*} req
     * @param {*} res
     */
    let getCoinHandler = async function (req, res, next) {
        try {
            const coinService = new CoinService(req.user.db);

            const coins = await coinService.getCoinByAccount();

            let response = new Response(200, coins, null)
            res.json(response)
        }  catch (err) {
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err)
        }
    }


    /**
     * This function will update the coin transaction once it is transferred.
     * req.body {
            C: '0x00000000000000000000000000000003',
            D: '0x00000000000000000000000000000012',
            E: '0x00000000000000000000000000000013',
            F: '0x00000000000000000000000000000002',
            S_C: '0xc89cb4c18e4533e164e01d63b2bb3f115485aa52d8c5b220e88e31',
            S_D: '0x3a3e83a09c8cd82d4a8f304472c55175e7c1c62058711e1fa1f95b',
            z_C_index: 6,
            z_D_index: 5,
            S_E: '0xD712C8800C085828BB5BA646465F1ACD1E4CC68F0458701696072E',
            S_F: '0xAF868DBCFA1418A093A5B933B5459E28C274D03E141C79FB84ACE4',
            sk_A: '0x109c06d0e24a1de314079f9670c44c233d8bfe888e3bad98cd1fff',
            z_C: '0xcaa89188896c93fc76b47721b27ab36bcc62805bce8026be0704d5',
            z_D: '0x305f1ac1bde98cdef5a38be525cbcdbf6e2e47940376370b9728d1',
            pk_A: '0xee75e30c839edadc4b83a2bb8b7bd9639b3fb56bae98b44d2408bb',
            receiver_name: 'jose',
            pk_B: '0xee75e30c839edadc4b83a2bb8b7bd9639b3fb56bae98b44d2408bb',
            action_type: 'transferred',
            z_E: '0xd179e1c20ab65ef3acf3644c8c57930e5b937980a80cc8645a9467',
            z_E_index: '7',
            z_F: '0xdde215a143549a1725d989d48988beb78c98fcfbbb4ffa1f91785b',
            z_F_index: '8'
        }
     * @param {*} req
     * @param {*} res
     */
    let updateCoinHandler = async function (req, res, next) {
        try {

            const coinService = new CoinService(req.user.db);
            await coinService.updateCoins(req.body);
            await coinService.addReturnCoins(
              {
                ...req.body
              }
            )
            let response = new Response(200, { message: "updated" }, null)
            res.json(response)
        } catch (err) {
            console.log(err);
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err);
        }
    }


    /**
     * This function will update the burned coin in db
     * req.body {
            A: '0x00000000000000000000000000000002',
            sk_A: '0x109c06d0e24a1de314079f9670c44c233d8bfe888e3bad98cd1fff',
            S_A: '0xaf868dbcfa1418a093a5b933b5459e28c274d03e141c79fb84ace4',
            pk_A: '0xee75e30c839edadc4b83a2bb8b7bd9639b3fb56bae98b44d2408bb',
            z_A_index: 8,
            z_A: '0xdde215a143549a1725d989d48988beb78c98fcfbbb4ffa1f91785b',
            z_C: '0xdde215a143549a1725d989d48988beb78c98fcfbbb4ffa1f91785b',
            z_C_index: 8,
            action_type: 'burned',
            account: '0x5fa9b72a39a691384749308ff75d0f5e0a6afd5d'
        }
     * @param {*} req
     * @param {*} res
     */
    let burnCoinHandler = async function (req, res, next) {
        try {
            const coinService = new CoinService(req.user.db);
            await coinService.updateBurnedCoin(req.body);
            let response = new Response(200, { message: "updated" }, null)
            res.json(response)
        } catch (err) {
            console.log('error response burnCoinHandler', err);
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err)
        }
    }


    /**
     * This function returns all the coins transactions for a particular account
     * req.query {
            pageNo: 1,
            limit: 5
         }
     * @param {*} req
     * @param {*} res
     */
    let getPrivateCoinTransactions = async function (req, res, next) {
        try {
            const coinService = new CoinService(req.user.db);
            const transactions = await coinService.getPrivateCoinTransactions(req.query);
            let response = new Response(200, transactions, null)
            res.json(response)
        } catch (err) {
            let response = new Response(500, null, {message: err.message})
            res.status(500).json(response)
            next(err)
        }
    }
