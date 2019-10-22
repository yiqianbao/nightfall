import request from 'request';
import config from 'config';

const url = config.get('authenticationApi.url');

const requestWrapper = options =>
  new Promise(function promiseHandler(resolve, reject) {
    request(options, function responseHandler(err, res, body) {
      if (err || res.statusCode === 500) {
        return reject(err || res.body);
      }
      return resolve(body);
    });
  });

export default {
  checkCorrectnessCoin(headers, body) {
    const options = {
      url: `${url}/checkCorrectnessForFTCommitment`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
  checkCorrectnessToken(headers, body) {
    const options = {
      url: `${url}/checkCorrectnessForNFTCommitment`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
  insertNFTToDb(headers, body) {
    const options = {
      url: `${url}/insertNFTToDb`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
  insertFTTransactionToDb(headers, body) {
    const options = {
      url: `${url}/insertFTTransactionToDb`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
  insertNFTCommitmentToDb(headers, body) {
    const options = {
      url: `${url}/insertNFTCommitmentToDb`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
  insertFTCommitmentToDb(headers, body) {
    const options = {
      url: `${url}/insertFTCommitmentToDb`,
      method: 'POST',
      json: true,
      headers,
      body,
    };
    return requestWrapper(options);
  },
};
