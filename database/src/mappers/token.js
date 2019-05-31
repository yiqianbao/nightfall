module.exports = ({

  A,
  S_A,
  pk_B,
  S_B,
  z_B,
  z_B_index,
  z_A,
  z_A_index,
  tokenUri,
  receiver_name,

  is_minted,
  is_transferred,
  is_burned,
  is_received,

  z_correct,
  z_onchain_correct

}) => {
  return {
    token_uri: (tokenUri || '').toLowerCase(),
    token_id: (A || '').toLowerCase(),
    salt: (S_A || '').toLowerCase(),
    token_commitment: (z_A || '').toLowerCase(),
    token_commitment_index: (z_A_index || z_A_index === 0)? z_A_index : '',

    [receiver_name ? 'transferee' : undefined]: (receiver_name || '').toLowerCase(),
    [pk_B ? 'transferee_public_key' : undefined]: (pk_B || '').toLowerCase(),
    [S_B ? 'transferee_salt' : undefined]: (S_B || '').toLowerCase(),
    [z_B ? 'transferee_token_commitment' : undefined]: (z_B || '').toLowerCase(),
    [(z_B_index || z_B_index===0)? 'transferee_token_commitment_index' : undefined ]: z_B_index,

    [is_minted ? 'is_minted' : undefined]: is_minted,
    [is_transferred ? 'is_transferred' : undefined]: is_transferred,
    [is_burned ? 'is_burned' : undefined]: is_burned,
    [is_received ? 'is_received' : undefined]: is_received,

    [(z_correct || z_correct===false) ? 'token_commitment_reconciles' : undefined]: z_correct,
    [(z_onchain_correct || z_onchain_correct===false) ? 'token_commitment_exists_onchain' : undefined]: z_onchain_correct
  }
}
