const coinMapper = ({
	A,
  pk_A,
  S_A,
  account,
  coin,
	coin_index,
  pk_B,
  z_E,
	z_E_index,
  z_F,
	z_F_index,
  C,
  S_C,
  E,
  S_E,
  F,
  S_F,
  D,
  S_D,
  burnedCoin,
  receiver_name,
	burnedCoin_index
}) => {
  return {
  	account: (account || '').toLowerCase(),
  	coin_value: (A || '').toLowerCase(),
  	receiver_name: (receiver_name || '').toLowerCase(),
		sender_public_key: (pk_A || '').toLowerCase(),
		salt: (S_A || '').toLowerCase(),
		coin_commitment: (coin || '').toLowerCase(),
		coin_commitment_index: (coin_index || coin_index===0)? coin_index : '',
    burn_coin_commitment: (burnedCoin || '').toLowerCase(),
		burn_coin_commitment_index: (burnedCoin_index || burnedCoin_index===0)? burnedCoin_index : '',
    receiver_public_key: (pk_B || '').toLowerCase(),
    receiver_salt: (S_E || '').toLowerCase(),
    returned_salt: (S_F || '').toLowerCase(),
    receiver_coin_commitment: (z_E || '').toLowerCase(),
		receiver_coin_commitment_index: (z_E_index || z_E_index===0)? z_E_index : '',
    returned_coin_commitment: (z_F || '').toLowerCase(),
		returned_coin_commitment_index: (z_F_index || z_F_index===0)? z_F_index : '',
    coins: [
      {
        coin_value: (C || '').toLowerCase(),
        salt: (S_C || '').toLowerCase()
      }, {
        coin_value: (D || '').toLowerCase(),
        salt: (S_D || '').toLowerCase()
      }
    ],
    receiver_coin_value: (E || '').toLowerCase(),
    returned_coin_value: (F || '').toLowerCase()
  }
}

const coinReceiverMapper = ({
  E,
  pk,
  S_E,
  z_E,
  z_E_index,

	z_correct,
	z_onchain_correct
}) => {
  return {
  	coin_value: (E || '').toLowerCase(),
		sender_public_key: (pk || '').toLowerCase(),
		salt: (S_E || '').toLowerCase(),
		coin_commitment: (z_E || '').toLowerCase(),
		coin_commitment_index: (z_E_index || z_E_index===0)? z_E_index : '',

		[(z_correct || z_correct===false) ? 'coin_commitment_reconciles' : undefined]: z_correct,
    [(z_onchain_correct || z_onchain_correct===false) ? 'coin_commitment_exists_onchain' : undefined]: z_onchain_correct
  }
}

module.exports = {
  coinMapper: coinMapper,
  coinReceiverMapper: coinReceiverMapper
}
