import Web3 from 'web3';

let accounts;

/* async function getEthAccounts() {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://ganache:8545'));
  accounts = await web3.eth.getAccounts();
  return accounts;
}

module.exports = getEthAccounts; */

export const getEthAccounts = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://ganache:8545'));
  accounts = await web3.eth.getAccounts();
  return accounts;
};

export default getEthAccounts;
