const request = require('request');

const Config = require('../config/config').getProps();
const host = Config.offchain.host + ':' + Config.offchain.port;


const isNameInUse = name => {
  return new Promise((resolve, reject) => {
    let url = host + '/pkd/name/exists?name=' + name;
    let options = {
      url,
      method : 'GET',
      json: true
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const setName = (address, name) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/pkd/name',
      method : 'POST',
      json: true,
      headers: { address },
      body: {name}
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const setZkpPublicKey = (address, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/pkd/zkp-publickey',
      method : 'POST',
      json: true,
      headers: { address },
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const getAddressFromName = name => {
  return new Promise((resolve, reject) => {
    let url = host + '/pkd/address?name=' + name;
    let options = {
      url,
      method : 'GET',
      json: true
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const getWhisperPK = name => {
  return new Promise((resolve, reject) => {
    let url = host + '/pkd/whisperkey?name=' + name;
    let options = {
      url,
      method : 'GET',
      json: true
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const getZkpPublicKeyFromName = name => {
   return new Promise((resolve, reject) => {
    let url = host + '/pkd/zkp-publickey?name=' + name;
    let options = {
      url,
      method : 'GET',
      json: true
    }
    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const setWhisperPK = ({address}, whisper_pk) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/pkd/whisperkey',
      method : 'POST',
      json: true,
      headers: { address },
      body: {whisper_pk}
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const generateShhIdentity = (details) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/whisper/generateShhIdentity',
      method : 'POST',
      json: true,
      body: details
    };

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}


const getWhisperPublicKey = (qs) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/whisper/getWhisperPublicKey',
      method : 'GET',
      json: true,
      qs
    };

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const subscribe = (details) => {
  return new Promise((resolve, reject) => {
      console.log(host + '/whisper/subscribe');
    let options = {
      url : host + '/whisper/subscribe',
      method : 'POST',
      json: true,
      body: details
    };

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const sendMessage = (details) => {
    return new Promise((resolve, reject) => {
      let options = {
        url : host + '/whisper/sendMessage',
        method : 'POST',
        json: true,
        body: details
      };

      request(options, (err, res, body) => {
        if(err)
          reject(err)
        resolve(body)
      })
  })
}


module.exports = {
  isNameInUse,
  setName,
  setZkpPublicKey,
  getAddressFromName,
  setWhisperPK,
  getWhisperPK,
  generateShhIdentity,
  getWhisperPublicKey,
  subscribe,
  getZkpPublicKeyFromName,
  sendMessage
}
