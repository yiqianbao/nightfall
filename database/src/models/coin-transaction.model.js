/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const CoinTransactionSchema = new Schema({
  coin_transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  type: {
    type: String,
    enum: ['minted', 'transferred', 'change', 'received', 'burned'],
    required: true,
  },
  coin_value: {
    type: String,
    trim: true,
    required: true,
  },
  returned_coin_value: {
    type: String,
    trim: true,
  },
  public_key: {
    type: String,
    trim: true,
  },
  sender_public_key: {
    type: String,
    trim: true,
  },
  receiver_public_key: {
    type: String,
    trim: true,
  },
  receiver_name: {
    type: String,
    trim: true,
  },
  salt: {
    type: String,
    trim: true,
    minlength: 18,
    maxlength: 56,
    required: true,
  },
  coin_commitment: {
    type: String,
    trim: true,
    maxlength: 56,
  },
  coin_commitment_index: {
    type: Number,
  },
  returned_salt: {
    type: String,
    trim: true,
  },
  returned_coin_commitment: {
    type: String,
    trim: true,
  },
  returned_coin_commitment_index: {
    type: Number,
  },
  coin_list: [
    {
      coin_value: {
        type: String,
        trim: true,
      },
      salt: {
        type: String,
        trim: true,
      },
      coin_commitment: {
        type: String,
        trim: true,
      },
      coin_commitment_index: {
        type: Number,
      },
    },
  ],
  timestamp: {
    type: Date,
    required: true,
  },
});

mongoose.set('debug', true);
module.exports = CoinTransactionSchema;
