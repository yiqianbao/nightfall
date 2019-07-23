/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const TokenSchema = new Schema(
  {
    token_uri: {
      type: String,
      required: true,
    },
    token_id: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    token_commitment: {
      type: String,
      unique: true,
      required: true,
    },
    token_commitment_index: {
      type: Number,
      required: true,
    },

    // transferee info
    transferee: String,
    transferee_public_key: String,
    transferee_salt: String,
    transferee_token_commitment: String,
    transferee_token_commitment_index: Number,

    // boolean stats
    is_minted: Boolean,
    is_transferred: Boolean,
    is_burned: Boolean,
    is_received: Boolean,

    // boolean stats - correctness checks
    token_commitment_reconciles: Boolean, // for a given A, pk, S and z, do we have that h(A,pk,S)=z?
    token_commitment_exists_onchain: Boolean, // does z exist on-chain?
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

mongoose.set('debug', true);
module.exports = TokenSchema;
