/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-commonjs */

const tokenMapper = ({
  A,
  action_type,
  pk_A,
  sku,
  S_A,
  token,
  token_index,
  pk_B,
  S_B,
  z_B,
  z_B_index,
  z_A,
  z_A_index,
  B1,
  B2,
  z_B1,
  z_B1_index,
  z_B2,
  z_B2_index,
  skuB1,
  skuB2,
  rootName1,
  rootName2,
  rootName,
  receiver_name,
}) => {
  return {
    asset_hash: A ? A.toLowerCase() : undefined,
    type: action_type ? action_type.toLowerCase() : undefined,
    sender_public_key: pk_A ? pk_A.toLowerCase() : undefined,
    sku,
    salt: S_A ? S_A.toLowerCase() : undefined,
    token_commitment: token ? token.toLowerCase() : z_A ? z_A.toLowerCase() : undefined,
    [token_index || token_index === 0 ? 'token_commitment_index' : undefined]: token_index,
    [z_A_index || z_A_index === 0 ? 'token_commitment_index' : undefined]: z_A_index,
    receiver_public_key: pk_B ? pk_B.toLowerCase() : undefined,
    receiver_name: (receiver_name || '').toLowerCase(),
    receiver_salt: S_B ? S_B.toLowerCase() : undefined,
    receiver_token_commitment: z_B ? z_B.toLowerCase() : undefined,
    receiver_token_commitment_index: z_B_index || z_B_index === 0 ? z_B_index : undefined,
    timestamp: new Date(),
    splited_data: [
      {
        asset_hash: B1 ? B1.toLowerCase() : undefined,
        token_commitment: z_B1 ? z_B1.toLowerCase() : undefined,
        token_commitment_index: z_B1_index || z_B1_index === 0 ? z_B1_index : undefined,
        sku: skuB1 ? skuB1.toLowerCase() : undefined,
        root_name: rootName1 ? rootName1.toLowerCase() : undefined,
      },
      {
        asset_hash: B2 ? B2.toLowerCase() : undefined,
        token_commitment: z_B2 ? z_B2.toLowerCase() : undefined,
        token_commitment_index: z_B2_index || z_B2_index === 0 ? z_B2_index : undefined,
        sku: skuB2 ? skuB2.toLowerCase() : undefined,
        root_name: rootName2 ? rootName2.toLowerCase() : undefined,
      },
    ],
    root_name: rootName ? rootName.toLowerCase() : undefined,
  };
};

module.exports = {
  tokenMapper,
};
