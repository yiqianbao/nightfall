/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const NFTTokenTransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['minted', 'transferred', 'received', 'burned', 'shielded'],
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    token_id: {
      type: String,
      index: true,
      required: true,
    },
    shield_contract_address: String,

    // transferee info
    transferee: String,
    transferee_address: String,

    // transferor info
    transferor: String,
    transferor_address: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

mongoose.set('debug', true);
module.exports = NFTTokenTransactionSchema;
