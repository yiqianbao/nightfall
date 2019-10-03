import utils from 'zkp-utils';

export default async function({ name, email, address, shhIdentity }) {
  const sk = await utils.rndHex(32);
  return {
    name,
    email,
    address: address.toLowerCase(),
    shh_identity: shhIdentity,
    secretkey: sk,
    publickey: utils.hash(sk),
  };
}
