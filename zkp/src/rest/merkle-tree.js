import request from 'request';
import config from 'config';
import utilsPoll from './utils-poll';

const url = `${config.merkleTree.host}:${config.merkleTree.port}`;

/**
Start the event filter in the merkle-tree microservice, for the given contract
*/
async function start(contractName) {
  console.log(`\nCalling /start(${contractName})`);
  return new Promise((resolve, reject) => {
    const options = {
      url: `${url}/start`,
      method: 'POST',
      json: true,
      headers: { contractname: contractName },
      // body:, // no body
    };
    request(options, (err, res, body) => {
      if (err) reject(err);
      else resolve(body.data);
    });
  });
}

/**
Posts a starts merkle-tree microservice's filter
@returns {false | object} Polling functions MUST return FALSE if the poll is unsuccessful. Otherwise we return the response from the merkle-tree microservice
*/
const startEventFilterPollingFunction = async args => {
  try {
    const { contractName } = args;

    const response = await start(contractName);

    return response;
  } catch (err) {
    console.log(
      `Got a polling error "${err}", but that might be because the external server missed our call - we'll poll again...`,
    );
    return false;
  }
};

/**
Starts the merkle-tree microservice's filter
@param {string} contractName
*/
async function startEventFilter(contractName) {
  console.log(`\nCalling startEventFilter(${contractName})`);
  console.log('\nRequesting the merkle-tree microservice start its filter...');
  try {
    // we poll the merkle-tree microservice, because it might not be 'up' yet
    const response = await utilsPoll.poll(
      startEventFilterPollingFunction,
      config.POLLING_FREQUENCY,
      {
        contractName,
      },
    );
    return response;
  } catch (err) {
    throw new Error(`Could not start merkle-tree microservice's filter`);
  }
}

/**
Get the latestLeaf object from the tree's metadata db.
@param {string} contractName
*/
async function getLatestLeaf(contractName) {
  console.log(`\nCalling getLatestLeaf(${contractName})`);
  return new Promise((resolve, reject) => {
    const options = {
      url: `${url}/metadata/latestLeaf`,
      method: 'GET',
      json: true,
      headers: { contractname: contractName },
      // body:, // no body; uses url param
    };
    request(options, (err, res, body) => {
      if (err) reject(err);
      else resolve(body.data);
    });
  });
}

/**
Posts a starts merkle-tree microservice's filter
@returns {false | object} Polling functions MUST return FALSE if the poll is unsuccessful. Otherwise we return the response from the merkle-tree microservice
*/
const getLatestLeafPollingFunction = async args => {
  try {
    const { contractName, blockNumber } = args;
    let latestFilteredBlockNumber = 0;

    const { latestLeaf } = await getLatestLeaf(contractName);

    latestFilteredBlockNumber = latestLeaf.blockNumber;

    if (latestFilteredBlockNumber < blockNumber) {
      console.log(
        `\nblockNumber ${blockNumber} has not yet been filtered into the merkle-tree's db`,
      );
      return false; // i.e. poll again until we know the required blockNumber has been filtered.
    }

    console.log(`\nThe merkle-tree microservice's filter has reached block ${blockNumber}`);
    return true;
  } catch (err) {
    console.log(
      `\nGot a polling error "${err}", but that might be because the external server missed our call - we'll poll again...`,
    );
    return false;
  }
};

/**
Start polling for the latestLeaf object, until we see that a particular blockNumber has been filterex.
@param {string} contractName
*/
async function waitForBlockNumber(contractName, blockNumber) {
  console.log(`\nCalling waitForBlockNumber(${contractName}, ${blockNumber})`);
  try {
    // we poll the merkle-tree microservice, because it might not have filtered the blockNumber we want yet:
    // eslint-disable-next-line no-await-in-loop
    await utilsPoll.poll(getLatestLeafPollingFunction, config.POLLING_FREQUENCY, {
      contractName,
      blockNumber,
    }); // eslint-disable-line no-await-in-loop
    return;
  } catch (err) {
    throw new Error(`Could not get the latestLeaf from the merkle-tree microservice`);
  }
}

/**
Get the leaf object for the given leafIndex.
@param {string} contractName
@param {integer} leafIndex
*/
async function getLeafByLeafIndex(contractName, leafIndex) {
  console.log(`\nCalling getLeafByLeafIndex(${contractName}, ${leafIndex})`);
  return new Promise((resolve, reject) => {
    const options = {
      url: `${url}/leaf/index/${leafIndex}`,
      method: 'GET',
      json: true,
      headers: { contractname: contractName },
      // body:, // no body; uses url param
    };
    request(options, (err, res, body) => {
      if (err) reject(err);
      else resolve(body.data);
    });
  });
}

/**
Get the nodes on the sibling path from the given leafIndex to the root.
@param {string} contractName
@param {integer} leafIndex
*/
async function getSiblingPathByLeafIndex(contractName, leafIndex) {
  console.log(`\nCalling getSiblingPathByLeafIndex(${contractName}, ${leafIndex})`);
  return new Promise((resolve, reject) => {
    const options = {
      url: `${url}/siblingPath/${leafIndex}`,
      method: 'GET',
      json: true,
      headers: { contractname: contractName },
      // body:, // no body; uses url param
    };
    request(options, (err, res, body) => {
      if (err) reject(err);
      else resolve(body.data);
    });
  });
}

export default {
  startEventFilter,
  waitForBlockNumber,
  getLeafByLeafIndex,
  getSiblingPathByLeafIndex,
};
