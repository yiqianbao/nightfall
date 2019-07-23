/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const NFTTokenSchema = new Schema(
  {
    uri: {
      type: String,
      trim: true,
      required: true,
    },
    token_id: {
      type: String,
      index: true,
      required: true,
    },
    shield_contract_address: String,

    // boolean stats
    is_shielded: {
      type: Boolean,
      default: false,
    },
    is_minted: Boolean,
    is_received: Boolean,
    is_transferred: Boolean,
    is_burned: Boolean,

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
module.exports = NFTTokenSchema;
