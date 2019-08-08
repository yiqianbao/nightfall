const request = require('request')
const jwt = require('jsonwebtoken')

const Config = require('../config/config').getProps();
const host = Config.database.host + ':' + Config.database.port;

const addToken = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/token',
      method : 'POST',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const addNFToken = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/nft',
      method : 'POST',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const updateNFToken = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/nft',
      method : 'PATCH',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const updateToken = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/token',
      method : 'PATCH',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const addCoin = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/coin',
      method : 'POST',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const createAccount = (details) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/createAccount',
      method : 'POST',
      json: true,
      body: details
    }
    request(options, (err, res, body) => {
      if(err){
        reject(err)
      }
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const login = (name, password) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/login',
      method : 'POST',
      body: {name, password},
      json: true
    }

    request(options, (err, res, body) => {
      if(err || res.statusCode==500){
        return reject(err || res.body);
      }
      resolve(body.data);
    })
  })
}

const updateCoin = ({name},details) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/coin',
      method : 'PATCH',
      json: true,
      headers: {name},
      body: details
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const updateUserWithPrivateAccount = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/privateAccount',
      method : 'POST',
      headers: {name},
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const updateWhisperIdentity = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/whisperIdentity',
      method : 'PATCH',
      headers: { name },
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const getWhisperIdentity = ({name}) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/whisperIdentity',
      method : 'GET',
      headers: {name},
      json: true
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const updateCoinForBurn = ({name},details) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/coin/burn',
      method : 'PATCH',
      json: true,
      headers: {name},
      body: details
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const fetchUser = ({name}, details) => {
  return new Promise((resolve, reject) => {
    const query = convertObjToQueryString(details);
    let options = {
      url : host + '/user?'+query,
      method : 'GET',
      json: true,
      headers: {name}
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body.data)
    })

  });
}

const addCoinShieldContractAddress = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/coinShield',
      method : 'POST',
      headers: {name},
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const addTokenShieldContractAddress = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/tokenShield',
      method : 'POST',
      headers: {name},
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const updateCoinShieldContractAddress = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/coinShield',
      method : 'PUT',
      headers: {name},
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const updateTokenShieldContractAddress = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/tokenShield',
      method : 'PUT',
      headers: {name},
      json: true,
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const deleteCoinShieldContractAddress = ({name}, qs) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/coinShield',
      method : 'DELETE',
      headers: {name},
      json: true,
      qs
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const deleteTokenShieldContractAddress =  ({name}, qs) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/user/tokenShield',
      method : 'DELETE',
      headers: {name},
      json: true,
      qs
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      if(body.statusCode !== 200)
        return reject(body.err);
      resolve(body)
    })
  })
}

const getNFToken = ({name}, token_id) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/nft/'+token_id,
      method : 'GET',
      json: true,
      headers: {name}
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body.data)
    })

  });
}

const addFTTransaction = ({name}, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/ft/transaction',
      method : 'POST',
      json: true,
      headers: {name},
      body
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body)
    })
  })
}

const getNFTokens = ({name}, qs) => {
  return new Promise((resolve, reject) => {
    let options = {
      url : host + '/nft',
      method : 'GET',
      json: true,
      headers: {name},
      qs
    }

    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body.data)
    })

  });
}

const addCoinTransaction = ({ name }, body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${host}/coin/transaction`,
      method: 'POST',
      json: true,
      headers: { name },
      body,
    };
    request(options, (err, res, body) => {
      if(err)
        reject(err)
      resolve(body.data)
    });
  });
};


function convertObjToQueryString (object) {
  let str = "";
  for (let key in object) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(object[key]);
  }
  return str;
};


module.exports = {
  addToken,                     //'/token', POST
  updateToken,                  //'/token', PATCH
  addCoin,                      //'/coin', POST
  updateCoin,                   //'/coin', PATCH
  updateCoinForBurn,            //'/coin/burn', PATCH
  createAccount,                //'/createAccount', POST
  updateUserWithPrivateAccount, //'/privateAccount', POST
  login,                        //'/login', POST
  fetchUser,                    //'/user?'+query, GET
  getWhisperIdentity,
  updateWhisperIdentity,
  addNFToken,
  updateNFToken,
  addCoinShieldContractAddress,
  addTokenShieldContractAddress,
  updateCoinShieldContractAddress,
  updateTokenShieldContractAddress,
  deleteCoinShieldContractAddress,
  deleteTokenShieldContractAddress,
  getNFToken,
  addFTTransaction,
  getNFTokens,
  addCoinTransaction,
};
