import Web3 from 'web3';
import config from 'config';

let web3 = null;

export default {
  connection: () => web3,

  /**
   * Connects to web3 and then sets proper handlers for events
   */
  connect: () => {
    console.log('Blockchain Connecting ...');
    const provider = new Web3.providers.WebsocketProvider(config.get('web3Provider'));

    const handleError = err => {
      console.error('Blockchain Error ...', err);
      process.exit(1);
    };

    const handleConnect = () => {
      console.log('Blockchain Connected ...');
    };

    provider.on('error', handleError);
    provider.on('connect', handleConnect);
    provider.on('end', handleError);
    web3 = new Web3(provider);
  },

  /**
   * Checks the status of connection
   *
   * @return {Boolean} - Resolves to true or false
   */
  isConnected: () => {
    if (web3) {
      return web3.eth.net.isListening();
    }
    return false;
  },
};
