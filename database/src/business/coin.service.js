/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import { COLLECTIONS } from '../common/constants.json';
import { coinMapper, coinReceiverMapper } from '../mappers/coin';
import CoinTransactionService from './coin_transaction.service';
import PublicCoinTransactionService from './public_coin_transaction.service';

module.exports = class CoinService {
  constructor(_db) {
    this.db = _db;
    this.coinTransactionService = new CoinTransactionService(_db);
    this.publicCoinTransactionService = new PublicCoinTransactionService(_db);
  }

  async addFTokenTransaction(data) {
    const { is_minted, is_received, is_transferred, is_burned } = data;

    if (is_received)
      return this.publicCoinTransactionService.insertTransaction({
        ...data,
        type: 'received',
      });
    if (is_minted)
      return this.publicCoinTransactionService.insertTransaction({ ...data, type: 'minted' });
    if (is_transferred)
      return this.publicCoinTransactionService.insertTransaction({
        ...data,
        type: 'transferred',
      });
    if (is_burned)
      return this.publicCoinTransactionService.insertTransaction({ ...data, type: 'burned' });
    return 0;
  }

  async getFTTransactions(query) {
    return this.publicCoinTransactionService.getTransactions(query);
  }

  /**
   * This function will add new coin to database
   * @param {object} data - contains all the atributes required while minting a coin
   */
  async addNewCoin(data) {
    const {
      coin_value,
      sender_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
    } = coinMapper(data);

    // Add coin mint transaction to coin-transaction history
    await this.coinTransactionService.addNewCoinTransaction(data);

    const transaction = {
      coin_value,
      sender_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      type: 'minted',
    };
    return this.db.saveData(COLLECTIONS.COIN, transaction);
  }

  async addNewCoinOnReceiverSide(data) {
    const {
      coin_value,
      sender_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      coin_commitment_reconciles,
      coin_commitment_exists_onchain,
    } = coinReceiverMapper(data);
    // Add coin mint transaction to coin-transaction history
    await this.coinTransactionService.addNewCoinTransaction(data);

    const transaction = {
      coin_value,
      sender_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      coin_commitment_reconciles,
      coin_commitment_exists_onchain,
      type: 'received',
    };
    return this.db.saveData(COLLECTIONS.COIN, transaction);
  }

  /**
   * This function is used to find all the coins associated with a public ethereum account
   * Coin which are in 'minted' or 'change' state.
   * @param {object} data - req query object containing public account
   * @returns {array} of coins transaction minted by that
   */
  async getCoinByAccount() {
    const collection = COLLECTIONS.COIN;
    return this.db.getDbValues(collection, {
      transfer_timestamp: { $exists: false },
      burn_timestamp: { $exists: false },
      coin_value: { $ne: '0x00000000000000000000000000000000' },
    });
  }

  async updateCoins(data) {
    const {
      coins,
      receiver_public_key,
      receiver_coin_commitment,
      returned_coin_commitment,
      receiver_coin_value,
      returned_coin_value,
      receiver_name,
      receiver_coin_commitment_index,
      returned_coin_commitment_index,
    } = coinMapper(data);

    for (let i = 0; i < coins.length; i += 1) {
      const coin = coins[i];
      this.db.updateData(
        COLLECTIONS.COIN,
        {
          coin_value: coin.coin_value,
          salt: coin.salt,
        },
        {
          $set: {
            receiver_public_key,
            transfer_timestamp: new Date(),
            receiver_coin_commitment,
            returned_coin_commitment,
            receiver_coin_value,
            returned_coin_value,
            receiver_coin_commitment_index,
            returned_coin_commitment_index,
            type: 'transfer',
            receiver_name,
          },
        },
      );
    }
    // capture coin transfer transaction and add to coin-transaction history
    await this.coinTransactionService.addNewCoinTransaction(data);
  }

  async addReturnCoins(data) {
    const {
      returned_coin_value,
      sender_public_key,
      returned_salt,
      returned_coin_commitment,
      returned_coin_commitment_index,
    } = coinMapper(data);

    // Inserting coin change
    const transactions = {
      coin_value: returned_coin_value,
      sender_public_key,
      salt: returned_salt,
      coin_commitment: returned_coin_commitment,
      coin_commitment_index: returned_coin_commitment_index,
      type: 'change',
    };
    await this.db.saveData(COLLECTIONS.COIN, transactions);

    // TODO-- db change -- history
    // capture coin change transaction and add to coin-transaction history
    // eslint-disable-next-line
    data.action_type = 'change';
    await this.coinTransactionService.addNewCoinTransaction(data);
  }

  async updateBurnedCoin(data) {
    const { coin_value, salt, burn_coin_commitment, burn_coin_commitment_index } = coinMapper(data);
    // Add coin burn transaction to coin-transaction history
    await this.coinTransactionService.addNewCoinTransaction(data);

    await this.db.updateData(
      COLLECTIONS.COIN,
      {
        coin_value,
        salt,
      },
      {
        $set: {
          burn_coin_commitment,
          burn_timestamp: new Date(),
          burn_coin_commitment_index,
          type: 'burned',
        },
      },
    );
  }

  async getPrivateCoinTransactions(query) {
    const { pageNo, limit } = query;
    const collection = COLLECTIONS.COIN_TRANSACTION;
    return this.db.getDbData(
      collection,
      null,
      null,
      { timestamp: -1 },
      parseInt(pageNo, 10),
      parseInt(limit, 10),
    );
  }
};
