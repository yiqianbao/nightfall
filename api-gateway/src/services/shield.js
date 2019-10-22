import { zkp } from '../rest';

/**
 * This is used to get available shield address from blockchain.
 * @param {*} req
 * @param {*} res
 */
// eslint-disable-next-line import/prefer-default-export
export async function getShieldAddresses(req, res, next) {
  try {
    const coinShield = await zkp.getCoinShield(req.user);
    const tokenShield = await zkp.getTokenShield(req.user);

    res.data = {
      coinShield: {
        contract_address: coinShield.shieldAddress,
        contract_name: coinShield.name,
      },
      tokenShield: {
        contract_address: tokenShield.shieldAddress,
        contract_name: tokenShield.name,
      },
    };
    next();
  } catch (err) {
    next(err);
  }
}
