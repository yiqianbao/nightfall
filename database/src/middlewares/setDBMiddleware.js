/* eslint-disable new-cap */

import db from '../mongodb/db';

const userDb = [];

/* eslint-disable-next-line */
module.exports = function(req, res, next) {
  try {
    const username = req.headers.name || req.body.name || req.query.name;
    if (!userDb[username]) {
      userDb[username] = new db(req.user.connection, username);
    }
    req.user.db = userDb[username];
    next();
  } catch (err) {
    next(err);
  }
};
