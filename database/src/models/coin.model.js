const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoinSchema = new Schema({
		coin_id: {
	    type    : mongoose.Schema.Types.ObjectId,
	    default : mongoose.Types.ObjectId,
	    unique: true
	  },
		type: {
				type: String,
				enum: ['change', 'transfer', 'minted', 'received', 'burned'],
				required: true
		},
	  coin_value: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56,
		  required: true
	  },
	  receiver_coin_value: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56,
	  },
	  returned_coin_value: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56,
	  },
	  sender_public_key: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56,
		  required: true
	  },
	  salt: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56,
		  required: true
	  },
	  coin_commitment: {
		  type: String,
		  trim: true,
		  maxlength: 56
	  },
	  minted_timestamp: {
		  type: Date,
		  default: Date.now,
		  required: true
	  },
	  receiver_public_key: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56
	  },
	  receiver_name: {
		type: String,
		trim: true
	  },
	  receiver_coin_commitment: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56
	  },
	  returned_coin_commitment: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56
		},
		returned_coin_commitment_index: {
			type: Number
		},
	  transfer_timestamp: {
		  type: Date
	  },
	  burn_coin_commitment: {
		  type: String,
		  trim: true,
		  minlength: 18,
		  maxlength: 56
	  },
	  burn_timestamp: {
		  type: Date
	  },
	  coin_commitment_index: {
	  	type: Number
	  },
		receiver_coin_commitment_index: {
			type: Number
		},

		// boolean stats - correctness checks
		coin_commitment_reconciles: Boolean, // for a given A, pk, S and z, do we have that h(A,pk,S)=z?
		coin_commitment_exists_onchain: Boolean // does z exist on-chain?
});

mongoose.set('debug', true);
module.exports = CoinSchema;
