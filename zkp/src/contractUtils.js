import contract from 'truffle-contract';
import jsonfile from 'jsonfile';
import config from 'config';
import Web3 from './web3';

const web3 = Web3.connect();

const contractMapping = {
  NFTokenShield: './build/contracts/NFTokenShield.json',
  NFTokenMetadata: './build/contracts/NFTokenMetadata.json',
  FTokenShield: './build/contracts/FTokenShield.json',
  FToken: './build/contracts/FToken.json',
  Verifier: './build/contracts/GM17_v0.json',
  VerifierRegistry: './build/contracts/Verifier_Registry.json',
};

export async function getContract(contractName) {
  if (!contractMapping[contractName]) {
    throw new Error('Unknown contract type in getContract');
  }
  const contractJson = jsonfile.readFileSync(contractMapping[contractName]);
  const contractInstance = contract(contractJson);
  contractInstance.setProvider(web3);
  const deployed = await contractInstance.deployed();
  return { contractInstance: deployed, contractJson };
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
