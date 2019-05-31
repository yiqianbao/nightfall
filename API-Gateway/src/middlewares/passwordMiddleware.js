const accounts = require('../rest/accounts');
const crypto = require('crypto');

const crypt_secret = "secret";

const encryptPassword = function (password) {
	const cipher = crypto.createCipher('aes-128-cbc', crypt_secret);
	let crypted = cipher.update(password,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

const decryptPassword = function (passwordHash) {
	const decipher = crypto.createDecipher('aes-128-cbc', crypt_secret);
	let decrpted = decipher.update(passwordHash,'hex','utf8')
  decrpted += decipher.final('utf8');
  return decrpted;
}


const unlockAccount = async function (req, res, next) {
	if (!req.user) return next();
	const {address, password} = req.user;

	try {
		await accounts.unlockAccount({address, password});
	} finally {
		next();
	}
}

module.exports = {
	unlockAccount,
	encryptPassword,
	decryptPassword
}