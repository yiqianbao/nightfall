import Web3 from 'web3';
import config from './config';

export const getEthAccounts = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(`${config.offchain.rpc.host}:${config.offchain.rpc.port}`));
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

export default getEthAccounts;
