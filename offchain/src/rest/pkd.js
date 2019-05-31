import request from 'request';
import Config from '../config';

const config = Config.getProps();

const host = `${config.offchain.app.host}:${config.offchain.app.port}`;

const getZkpPublicKeyFromName = name => {
  return new Promise((resolve, reject) => {
    const url = `${host}/pkd/zkp-publickey?name=${name}`;
    const options = {
      url,
      method: 'GET',
      json: true,
    };
    request(options, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
};

export default {
  getZkpPublicKeyFromName,
};
