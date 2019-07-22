/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import { COLLECTIONS } from '../common/constants.json';

module.exports = class PublicTokenTransactionService {
  constructor(_db) {
    this.db = _db;
  }

  async insertTransaction({
    uri,
    token_id,
    shield_contract_address,
    type,
    transferor,
    transferor_address,
    transferee,
    transferee_address,
  }) {
    await this.db.saveData(COLLECTIONS.PUBLIC_TOKEN_TRANSACTION, {
      uri,
      token_id,
      shield_contract_address,
      type,
      transferor,
      transferor_address,
      transferee,
      transferee_address,
    });
  }

  async getTransactions(query) {
    const { pageNo, limit } = query;
    return this.db.getDbData(
      COLLECTIONS.PUBLIC_TOKEN_TRANSACTION,
      {},
      null,
      { created_at: -1 },
      parseInt(pageNo, 10),
      parseInt(limit, 10),
    );
  }
};
