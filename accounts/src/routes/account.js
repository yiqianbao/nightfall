import express from 'express';
import Response from './response/response';
import { newAccount, sendEtherToAccount, getBalance, pay } from '../services/accounts';

const router = express.Router({ mergeParams: true });

router.post('/new', async (req, res) => {
  const { password } = req.body;

  try {
    const address = await newAccount(password);
    await sendEtherToAccount(address);

    const response = new Response(200, address, null);
    res.json(response);
  } catch (err) {
    console.error('Error in createAccount', err);

    const response = new Response(500, null, err);
    res.status(500).json(response);
  }
});

router.post('/anonymous', async (req, res) => {
  try {
    const address = await newAccount();

    const response = new Response(200, address, null);
    res.json(response);
  } catch (err) {
    console.error('Error in anonymous', err);

    const response = new Response(500, null, err);
    res.status(500).json(response);
  }
});

router.get('/:address', async (req, res) => {
  const { address } = req.params;
  const balance = await getBalance(address);

  res.send(balance);
});

router.put('/pay/:address', async (req, res) => {
  const { address } = req.params;
  const { from, amount } = req.body;

  try {
    const txHash = await pay(address, from, amount);

    res.send(txHash);
  } catch (err) {
    console.error(err);

    res.sendStatus(500);
  }
});

export default router;
