/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-commonjs */

const coinMapper = ({
  A,
  pk_A,
  S_A,
  account,
  coin,
  coin_index,
  burnedCoin,
	burnedCoin_index,
  action_type,
  receiver_name
}) => {
  return {
    account: (account || '').toLowerCase(),
    coin_value: (A || '').toLowerCase(),
    public_key: (pk_A || '').toLowerCase(),
    salt: (S_A || '').toLowerCase(),
    coin_commitment: (coin || burnedCoin || '').toLowerCase(),
		coin_commitment_index: (coin_index || coin_index===0)? coin_index : (burnedCoin_index || burnedCoin_index===0)? burnedCoin_index : '',
    type: (action_type || '').toLowerCase(),
    receiver_name,
  }
}

const coinTransferOrReceiverMapper = ({
  pk_A,
  pk_B,
  z_E,
  z_E_index,
  z_F,
  z_F_index,
  z_C,
  z_C_index,
  z_D,
  z_D_index,
  C,
  S_C,
  E,
  S_E,
  F,
  S_F,
  D,
  S_D,
  receiver_name,
  action_type,
}) => {
  return {
    type: (action_type || '').toLowerCase(),
    coin_value: (E || '').toLowerCase(), // transfer amount
    public_key:
      action_type === 'transferred' ? (pk_A || '').toLowerCase() : (pk_B || '').toLowerCase(),
    sender_public_key: (pk_A || '').toLowerCase(),
    receiver_public_key: (pk_B || '').toLowerCase(),
    receiver_name: (receiver_name || '').toLowerCase(),
    salt: (S_E || '').toLowerCase(),
    coin_commitment: (z_E || '').toLowerCase(),
    coin_commitment_index: z_E_index || z_E_index === 0 ? z_E_index : '',
    returned_coin_value: (F || '').toLowerCase(),
    returned_salt: (S_F || '').toLowerCase(),
    returned_coin_commitment: (z_F || '').toLowerCase(),
    returned_coin_commitment_index: z_F_index || z_F_index === 0 ? z_F_index : '',
    coin_list: [
      {
        coin_value: (C || '').toLowerCase(),
        salt: (S_C || '').toLowerCase(),
        coin_commitment: (z_C || '').toLowerCase(),
        coin_commitment_index: z_C_index || z_C_index === 0 ? z_C_index : '',
      },
      {
        coin_value: (D || '').toLowerCase(),
        salt: (S_D || '').toLowerCase(),
        coin_commitment: (z_D || '').toLowerCase(),
        coin_commitment_index: z_D_index || z_D_index === 0 ? z_D_index : '',
      },
    ],
  };
};

const coinChangeMapper = ({
  pk_A,
  z_F,
  z_F_index,
  z_C,
  z_C_index,
  z_D,
  z_D_index,
  C,
  S_C,
  F,
  S_F,
  D,
  S_D,
  action_type,
}) => {
  return {
    type: (action_type || '').toLowerCase(),
    coin_value: (F || '').toLowerCase(), // return amount
    public_key: (pk_A || '').toLowerCase(), // pub key of the owner
    salt: (S_F || '').toLowerCase(),
    coin_commitment: (z_F || '').toLowerCase(),
    coin_commitment_index: z_F_index || z_F_index === 0 ? z_F_index : '',
    coin_list: [
      {
        coin_value: (C || '').toLowerCase(),
        salt: (S_C || '').toLowerCase(),
        coin_commitment: (z_C || '').toLowerCase(),
        coin_commitment_index: z_C_index || z_C_index === 0 ? z_C_index : '',
      },
      {
        coin_value: (D || '').toLowerCase(),
        salt: (S_D || '').toLowerCase(),
        coin_commitment: (z_D || '').toLowerCase(),
        coin_commitment_index: z_D_index || z_D_index === 0 ? z_D_index : '',
      },
    ],
  };
};

module.exports = {
  coinMapper,
  coinTransferOrReceiverMapper,
  coinChangeMapper,
};
