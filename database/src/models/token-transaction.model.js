const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenTransactionSchema = new Schema({
	type: {
		type: String,
		enum: ['mint', 'transfer', 'received' , 'burned'],
		required: true
	},
	token_uri: {
		type: String,
		required: true
	},
	token_id: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	token_commitment: {
		type: String,
		index: true,
		required: true
	},
	token_commitment_index: {
		type: Number,
		required: true
	},

	// transferee info
	transferee: String,
	transferee_public_key: String,
	transferee_salt: String,
	transferee_token_commitment: String,
	transferee_token_commitment_index: Number
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

mongoose.set('debug', true);
module.exports = TokenTransactionSchema
