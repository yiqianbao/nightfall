import { Schema } from 'mongoose';

export default new Schema(
  {
    transaction_type: {
      type: String,
      enum: ['mint', 'transfer_outgoing', 'transfer_incoming', 'burn'],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    shield_contract_address: {
      type: String,
      index: true,
    },

    // receiver info
    receiver: {
      name: String,
      address: String,
    },

    // sender info
    sender: {
      name: String,
      address: String,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
