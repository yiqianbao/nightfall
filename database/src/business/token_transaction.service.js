let {COLLECTIONS} = require('../common/constants.json');

module.exports = class TokenTransactionService {
	constructor (_db) {
		this.db = _db;
	}

	async insertTransaction ({
		type,
		token_uri,
		token_id,
		salt,
		token_commitment,
		token_commitment_index,
		transferee,
		transferee_public_key,
		transferee_salt,
		transferee_token_commitment,
		transferee_token_commitment_index
	}) {
		await this.db.saveData(
			COLLECTIONS.TOKEN_TRANSACTION,
			{
				type,
				token_uri,
				token_id,
				salt,
				token_commitment,
				token_commitment_index,
				transferee,
				transferee_public_key,
				transferee_salt,
				transferee_token_commitment,
				transferee_token_commitment_index

			}
		);
	}

	async getTransactions(query) {
		const { pageNo, limit} = query
		return await this.db.getDbData(
			COLLECTIONS.TOKEN_TRANSACTION,
			{},
			null,
			{created_at: -1},
			parseInt(pageNo),
			parseInt(limit)
		);
	}
}
