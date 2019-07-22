import Web3 from 'web3';
import Config from './config';

let accounts;
const config = Config.getProps();

/* async function getEthAccounts() {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://ganache:8545'));
  accounts = await web3.eth.getAccounts();
  return accounts;
}

module.exports = getEthAccounts; */

export const getEthAccounts = async () => {
  const web3 = new Web3(
  Web3.givenProvider ||
    new Web3.providers.HttpProvider(`${config.zkp.rpc.host}:${config.zkp.rpc.port}`),
);
  accounts = await web3.eth.getAccounts();
  return accounts;
};

export default getEthAccounts;
