import request from 'request';
import Config from '../config';

const config = Config.getProps();

const host = `${config.authenticationApi.host}:${config.authenticationApi.port}`;

const coinTransfer = (jwtToken, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/coin/transfer`,
      method: 'POST',
      json: true,
      headers: {
        authorization: jwtToken,
      },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const checkCorrectnessCoin = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/coin/checkCorrectness`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const tokenTransfer = (jwtToken, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/token/transfer`,
      method: 'POST',
      json: true,
      headers: {
        authorization: jwtToken,
      },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const checkCorrectnessToken = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/token/checkCorrectness`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const sendWhisperMessage = (jwtToken, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/whisper/send`,
      method: 'POST',
      json: true,
      headers: {
        authorization: jwtToken,
      },
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addNFTokenToDB = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/database/nft`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addFTokenToDB = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/database/ft/transaction`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addTokenCommitmentToDB = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/database/token`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

const addCoinCommitmentToDB = (headers, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/database/coin`,
      method: 'POST',
      json: true,
      headers,
      body,
    };

    request(options, (err, res, responseBody) => {
      if (err) reject(err);
      resolve(responseBody);
    });
  });
};

export default {
  coinTransfer,
  checkCorrectnessCoin,
  tokenTransfer,
  checkCorrectnessToken,
  sendWhisperMessage,
  addNFTokenToDB,
  addFTokenToDB,
  addTokenCommitmentToDB,
  addCoinCommitmentToDB,
};
