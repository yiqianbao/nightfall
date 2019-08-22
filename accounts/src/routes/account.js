import express from 'express';
import Response from './response/response';
import { newAccount, sendEtherToAccount, getBalance, pay } from '../services/accounts';

const router = express.Router({ mergeParams: true });

async function createAccount(req, res) {
  const { password } = req.body;
  try {
    const address = await newAccount(password);
    if (password) {
      await sendEtherToAccount(address);
    }
    const response = new Response(200, address, null);
    res.json(response);
  } catch (err) {
    console.error('Error in createAccount', err);
    const response = new Response(500, null, err);
    res.status(500).json(response);
  }
}

async function getAccountBalance(req, res) {
  const { address } = req.params;
  const balance = await getBalance(address);

  res.send(balance);
}

async function transferEther(req, res) {
  const { address } = req.params;
  const { from, amount } = req.body;
  try {
    const txHash = await pay(address, from, amount);
    res.send(txHash);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

router.post('/new', createAccount);
router.post('/anonymous', createAccount);
router.get('/:address', getAccountBalance);
router.put('/pay/:address', transferEther);

export default router;
