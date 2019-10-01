import request from 'request';
import config from 'config';

const url = config.get('database.url');

const requestWrapper = options =>
  new Promise(function promiseHandler(resolve, reject) {
    request(options, function responseHandler(err, res, body) {
      if (err || res.statusCode !== 200) {
        return reject(err || res.body.error);
      }
      return resolve(body.data);
    });
  });

/*
 * rest calls to database microservice
 */
export default {
  // insert user data intro user collection
  createUser(body) {
    const options = {
      url: `${url}/users`,
      method: 'POST',
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  configureDBconnection(body) {
    const options = {
      url: `${url}/db-connection`,
      method: 'POST',
      body,
      json: true,
    };
    return requestWrapper(options);
  },

  // fetch logged in user info from. user collection
  fetchUser({ name }) {
    const options = {
      url: `${url}/users/${name}`,
      method: 'GET',
      json: true,
    };
    return requestWrapper(options);
  },

  // update user info in user collection
  updateUser({ name }, body) {
    const options = {
      url: `${url}/users/${name}`,
      method: 'PATCH',
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // add anonymous one time used account to user collection
  updateUserWithPrivateAccount({ name }, body) {
    const options = {
      url: `${url}/users/${name}/private-accounts`,
      method: 'POST',
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // insert non-fungible token info in nft collection
  insertNFToken({ name }, body) {
    const options = {
      url: `${url}/nfts`,
      method: 'POST',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  // update non-fungible token info in nft collection
  updateNFTokenByTokenId({ name }, tokenId, body) {
    const options = {
      url: `${url}/nfts/${tokenId}`,
      method: 'PATCH',
      json: true,
      headers: { loggedInUsername: name},
      body,
    };
    return requestWrapper(options);
  },

  // fetch non-fungible tokens
  getNFTokens({ name }, qs) {
    const options = {
      url: `${url}/nfts`,
      method: 'GET',
      json: true,
      headers: { loggedInUsername: name },
      qs,
    };
    return requestWrapper(options);
  },


  // insert non-fungible token commitment info in nft_commitment collection
  insertNFTCommitment({ name }, body) {
    const options = {
      url: `${url}/nft-commitments`,
      method: 'POST',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  // update non-fungible token commitment info in nft_commitment collection
  updateNFTCommitmentByTokenId({ name }, tokenId, body) {
    const options = {
      url: `${url}/nft-commitments/${tokenId}`,
      method: 'PATCH',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  getNFTCommitments({ name }) {
    const options = {
      url: `${url}/nft-commitments`,
      method: 'GET',
      json: true,
      headers: { loggedInUsername: name },
    };
    return requestWrapper(options);
  },

  // insert fungible token trantion info in ft_transaction collection
  insertFTTransaction({ name }, body) {
    const options = {
      url: `${url}/fts/transactions`,
      method: 'POST',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  // insert fungible token commitment info in ft_commitment collection
  insertFTCommitment({ name }, body) {
    const options = {
      url: `${url}/ft-commitments`,
      method: 'POST',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  // update fungible token commitment info in ft_commitment collection
  updateFTCommitmentByCommitmentHash({ name }, commitmentHash, body) {
    const options = {
      url: `${url}/ft-commitments/${commitmentHash}`,
      method: 'PATCH',
      json: true,
      headers: { loggedInUsername: name },
      body,
    };
    return requestWrapper(options);
  },

  getFTCommitments({ name }) {
    const options = {
      url: `${url}/ft-commitments`,
      method: 'GET',
      json: true,
      headers: { loggedInUsername: name },
    };
    return requestWrapper(options);
  },

  // insert fungible token commitment transaction info in ft_commitment_transaction collection
  insertFTCommitmentTransaction({ name }, body) {
    const options = {
      url: `${url}/ft-commitments/transactions`,
      method: 'POST',
      json: true,
      headers: { name },
      body,
    };
    return requestWrapper(options);
  },

  // insert new coin shield contract info for user in user collection
  addCoinShieldContractAddress({ name }, body) {
    const options = {
      url: `${url}/user/coinShield`,
      method: 'POST',
      headers: { name },
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // update coin shield contract info for user in user collection
  updateCoinShieldContractAddress({ name }, body) {
    const options = {
      url: `${url}/user/coinShield`,
      method: 'PUT',
      headers: { name },
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // delete coin shield contract info for user from user collection
  deleteCoinShieldContractAddress({ name }, qs) {
    const options = {
      url: `${url}/user/coinShield`,
      method: 'DELETE',
      headers: { name },
      json: true,
      qs,
    };
    return requestWrapper(options);
  },

  // insert new token shield contract info for user in user collection
  addTokenShieldContractAddress({ name }, body) {
    const options = {
      url: `${url}/user/tokenShield`,
      method: 'POST',
      headers: { name },
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // update token shield contract info for user in user collection
  updateTokenShieldContractAddress({ name }, body) {
    const options = {
      url: `${url}/user/tokenShield`,
      method: 'PUT',
      headers: { name },
      json: true,
      body,
    };
    return requestWrapper(options);
  },

  // delete token shield contract info for user from user collection
  deleteTokenShieldContractAddress({ name }, qs) {
    const options = {
      url: `${url}/user/tokenShield`,
      method: 'DELETE',
      headers: { name },
      json: true,
      qs,
    };
    return requestWrapper(options);
  },
};
