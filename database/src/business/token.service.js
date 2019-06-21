/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import { COLLECTIONS } from '../common/constants.json';

import tokenMapper from '../mappers/token';

import TokenTransactionService from './token_transaction.service';
import PublicTokenTransactionService from './public_token_transaction.service';

module.exports = class TokenService {
  constructor(_db) {
    this.db = _db;
    this.tokenTransactionService = new TokenTransactionService(_db);
    this.publicTokenTransactionService = new PublicTokenTransactionService(_db);
  }

  // nft
  async addNFToken(data) {
    const { is_minted, is_received } = data;
    await this.db.saveData(COLLECTIONS.PUBLIC_TOKEN, data);

    if (is_received)
      return this.publicTokenTransactionService.insertTransaction({
        ...data,
        type: 'received',
      });
    if (is_minted)
      return this.publicTokenTransactionService.insertTransaction({
        ...data,
        type: 'minted',
      });
    return 0;
  }

  async updateNFToken(data) {
    const { token_id, is_transferred, is_burned, is_shielded } = data;

    await this.db.updateData(
      COLLECTIONS.PUBLIC_TOKEN,
      {
        token_id,
        is_transferred: { $exists: false },
      },
      { $set: data },
    );

    if (is_transferred)
      return this.publicTokenTransactionService.insertTransaction({
        ...data,
        type: 'transferred',
      });
    if (is_burned)
      return this.publicTokenTransactionService.insertTransaction({
        ...data,
        type: 'burned',
      });
    if (is_shielded)
      return this.publicTokenTransactionService.insertTransaction({
        ...data,
        type: 'shielded',
      });
    return 0;
  }

  async getNFTokens(query) {
    if (!query || !query.pageNo || !query.limit) {
      return this.db.getData(COLLECTIONS.PUBLIC_TOKEN, {
        shield_contract_address: query.shield_contract_address
          ? query.shield_contract_address
          : null,
        is_transferred: { $exists: false },
        is_burned: { $exists: false },
        is_shielded: false,
      });
    }
    const { pageNo, limit } = query;
    return this.db.getDbData(
      COLLECTIONS.PUBLIC_TOKEN,
      {
        shield_contract_address: query.shield_contract_address
          ? query.shield_contract_address
          : null,
        is_transferred: { $exists: false },
        is_burned: { $exists: false },
        is_shielded: false,
      },
      null,
      { created_at: -1 },
      parseInt(pageNo, 10),
      parseInt(limit, 10),
    );
  }

  async getNFToken(token_id) {
    return this.db.findOne(COLLECTIONS.PUBLIC_TOKEN, {
      token_id,
      is_transferred: { $exists: false },
    });
  }

  async getNFTTransactions(query) {
    return this.publicTokenTransactionService.getTransactions(query);
  }

  // private token
  async addNewToken(data) {
    await this.db.saveData(COLLECTIONS.TOKEN, tokenMapper(data));

    const { is_minted, is_received } = data;

    if (is_received)
      return this.tokenTransactionService.insertTransaction({
        ...tokenMapper(data),
        type: 'received',
      });
    if (is_minted)
      return this.tokenTransactionService.insertTransaction({
        ...tokenMapper(data),
        type: 'mint',
      });
    return 0;
  }

  async updateToken(data) {
    const { A, is_transferred, is_burned } = data;

    await this.db.updateData(
      COLLECTIONS.TOKEN,
      {
        token_id: A,
        is_transferred: { $exists: false },
      },
      { $set: tokenMapper(data) },
    );

    if (is_transferred)
      return this.tokenTransactionService.insertTransaction({
        ...tokenMapper(data),
        type: 'transfer',
      });
    if (is_burned)
      return this.tokenTransactionService.insertTransaction({
        ...tokenMapper(data),
        type: 'burned',
      });
    return 0;
  }

  async getToken(pageination) {
    if (!pageination || !pageination.pageNo || !pageination.limit) {
      return this.db.getData(COLLECTIONS.TOKEN, {
        is_transferred: { $exists: false },
        is_burned: { $exists: false },
      });
    }
    const { pageNo, limit } = pageination;
    return this.db.getDbData(
      COLLECTIONS.TOKEN,
      {
        is_transferred: { $exists: false },
        is_burned: { $exists: false },
      },
      null,
      { created_at: -1 },
      parseInt(pageNo, 10),
      parseInt(limit, 10),
    );
  }

  async getPrivateTokenTransactions(query) {
    return this.tokenTransactionService.getTransactions(query);
  }
};
