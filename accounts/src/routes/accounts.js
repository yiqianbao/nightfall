/* eslint-disable func-names */

import express from 'express';
import Response from './response/response';
import { unlockAccount } from '../services/accounts';

const router = express.Router({ mergeParams: true });

router.post('/unlock', async function(req, res) {
  const { address, password } = req.body;

  try {
    await unlockAccount(address, password);

    const response = new Response(200, { message: 'Unlocked' }, null);
    res.json(response);
  } catch (err) {
    const response = new Response(500, null, err);
    res.status(500).json(response);
  }
});

export default router;
