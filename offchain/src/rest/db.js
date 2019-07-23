import request from 'request';
import Config from '../config';

const config = Config.getProps();

const host = `${config.database.host}:${config.database.port}`;

const addCoin = ({ transferee }, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/coin`,
      method: 'POST',
      json: true,
      headers: { name: transferee },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addToken = ({ transferee }, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/token`,
      method: 'POST',
      json: true,
      headers: { name: transferee },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const getCoins = receiverName => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/coin`,
      method: 'GET',
      headers: { name: receiverName },
      json: true,
    };
    request(options, (err, res, body) => {
      if (err) return reject(err);
      if (body.statusCode !== 200) return reject(body);
      return resolve(body.data.data);
    });
  });
};

// need to get the assetHashes for all the tokens we want to transfer
const getTokens = (receiverName, sku) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/token`,
      method: 'GET',
      headers: { name: receiverName },
      json: true,
      qs: { sku },
    };
    request(options, (err, res, body) => {
      if (err) return reject(err);
      if (body.statusCode !== 200) return reject(body);
      return resolve(body.data[0]);
    });
  });
};

const addNFTToken = ({ transferee }, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/nft`,
      method: 'POST',
      json: true,
      headers: { name: transferee },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addFToken = ({ transferee }, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/ft/transaction`,
      method: 'POST',
      json: true,
      headers: { name: transferee },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

export default {
  addCoin,
  getCoins,
  addToken,
  getTokens,
  addNFTToken,
  addFToken,
};
