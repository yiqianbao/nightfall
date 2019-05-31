let env = 'LOCAL'; // set the environment to local if not mentioned while starting the app
const props = {
  LOCAL: {
    database: {
      app: {
        host: 'http://database',
        port: '80',
      },
      rpc: {
        host: 'http://ganache',
        port: '8545',
      },
    },
    offchain: {
      app: {
        host: 'http://offchain',
        port: '80',
      },
      rpc: {
        host: 'http://ganache',
        port: '8545',
      },
    },
    authenticationApi: {
      app: {
        host: 'http://api-gateway',
        port: '80',
      },
      rpc: {
        host: 'http://ganache',
        port: '8545',
      },
    },
  },
};

/**
 * Set the environment
 * @param { string } environment - environment of app
 */
const setEnv = environment => {
  if (props[environment]) {
    env = environment;
  }
};

/**
 * get the appropriate environment config
 */
const getProps = () => {
  return props[env];
};

export default {
  setEnv,
  getProps,
};
