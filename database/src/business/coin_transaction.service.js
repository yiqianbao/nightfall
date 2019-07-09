/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-commonjs */

import { COLLECTIONS } from '../common/constants.json';
import {
  coinMapper,
  coinTransferOrReceiverMapper,
  coinChangeMapper,
} from '../mappers/coin-transaction';

module.exports = class CoinTransactionService {
  constructor(_db) {
    this.db = _db;
  }

  async addNewCoinTransaction(data) {
    let coinTransaction = {};
    if (data.action_type === 'minted') {
      coinTransaction = this.mintOrBurnData(data);
    } else if (data.action_type === 'transferred') {
      coinTransaction = this.transferOrReceiveData(data);
    } else if (data.action_type === 'burned') {
      coinTransaction = this.mintOrBurnData(data);
    } else if (data.action_type === 'change') {
      coinTransaction = this.coinChangeData(data);
    } else if (data.action_type === 'received') {
      coinTransaction = this.transferOrReceiveData(data);
    }
    return this.db.saveData(COLLECTIONS.COIN_TRANSACTION, coinTransaction);
  }

 	mintOrBurnData(data) {
		const {
			account,
			coin_value,
			type,
			public_key,
			salt,
			coin_commitment,
			coin_commitment_index,
			receiver_name
		}= coinMapper(data);

		let coinTransaction = {
			account,
			coin_value,
			public_key,
			salt,
			coin_commitment,
			coin_commitment_index,
			type,
			timestamp: new Date(),
			[receiver_name ? 'receiver_name' : undefined] : receiver_name,
		}
		return coinTransaction;
	}

  transferOrReceiveData(data) {
    const {
      account,
      type,
      coin_value, // transfer amount
      public_key,
      sender_public_key,
      receiver_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      returned_coin_value,
      returned_salt,
      returned_coin_commitment,
      returned_coin_commitment_index,
      coin_list,
      receiver_name,
    } = coinTransferOrReceiverMapper(data);

    const coinTransaction = {
      account,
      type,
      coin_value, // transfer amount
      public_key,
      sender_public_key,
      receiver_public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      returned_coin_value,
      returned_salt,
      returned_coin_commitment,
      returned_coin_commitment_index,
      coin_list,
      receiver_name,
      timestamp: new Date(),
    };
    return coinTransaction;
  }

  coinChangeData(data) {
    const {
      account,
      type,
      coin_value, // transfer amount
      public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      coin_list,
    } = coinChangeMapper(data);

    const coinTransaction = {
      account,
      type,
      coin_value, // transfer amount
      public_key,
      salt,
      coin_commitment,
      coin_commitment_index,
      coin_list,
      timestamp: new Date(),
    };
    return coinTransaction;
  }
};
