import contract from 'truffle-contract';
import jsonfile from 'jsonfile';
import Web3 from 'web3';
import config from 'config';

const web3 = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(config.get('web3ProviderURL')),
);

const contractMapping = {
  NFTokenShield: './build/contracts/NFTokenShield.json',
  VerifierRegistry: './build/contracts/Verifier_Registry.json',
  Verifier: './build/contracts/GM17_v0.json',
  NFTokenMetadata: './build/contracts/NFTokenMetadata.json',
};

// eslint-disable-next-line import/prefer-default-export
export async function getContract(contractName) {
  if (!contractMapping[contractName]) {
    throw new Error('Unknown contract type in getContract');
  }
  const contractInstance = contract(jsonfile.readFileSync(contractMapping[contractName]));
  contractInstance.setProvider(web3.currentProvider);
  const deployed = await contractInstance.deployed();
  return deployed;
}

export async function getVkId(actionName) {
  const vkIds = await new Promise((resolve, reject) =>
    jsonfile.readFile(config.get('VK_IDS'), (err, data) => {
      // doesn't natively support promises
      if (err) reject(err);
      else resolve(data);
    }),
  );
  const { vkId } = vkIds[actionName];
  return vkId;
}
