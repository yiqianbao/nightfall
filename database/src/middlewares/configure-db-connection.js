import dbConnections from '../common/dbConnections';

export default async function(req, res, next) {
  req.user = {};

  try {
    // signup need admin privalage as it create user sepcific tables.
    if (req.path === '/users' && req.method === 'POST') {
      req.user.connection = dbConnections.admin;
      return next();
    }

    if (req.path === '/dbConnection' && req.method === 'POST') {
      return next();
    }

    const name = req.headers.name || req.body.name || req.query.name;
    if (name) {
      if (!dbConnections[name]) next(new Error('user never loggedIn in'));
      req.user.connection = dbConnections[name];
      return next();
    }
    throw new Error('DB connection assign failed');
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
