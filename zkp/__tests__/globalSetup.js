import { merkleTree } from 'nightlite';
import bc from '../src/web3';
import vk from '../src/vk-controller';

async function loadVks() {
  if (!(await bc.isConnected())) return;
  await vk.runController();
  console.log('All keys are registered');
}

async function startEventFilter() {
  console.log(`\nStarting event filters...`);
  await merkleTree.startEventFilter();
}

// This is TRIGGERED via the jest configuration options in ../package.json
module.exports = async function globalSetup() {
  await loadVks();
  await startEventFilter();
};
