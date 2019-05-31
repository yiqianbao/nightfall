const DB = require('../mongodb/db');

const userDb = [];
module.exports = function (req, res, next) {
	try {
		const username = req.headers.name || req.body.name || req.query.name;
		if (!userDb[username]) {
			userDb[username] = new DB(req.user.connection, username);
		}
		req.user.db = userDb[username];
		next();
	} catch (err) {
		next(err);
	}
}