import { UserService } from '../business';
import { setDB } from '../middlewares';

/**
 * This function will create a user(public ethereum account)
 * req.body = {
 *  name: 'a',
 *  email: 'a',
 *  address: '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' => Ethereum account
 * }
 * @param {*} req
 * @param {*} res
 */
async function createUser(req, res, next) {
  const userService = new UserService(req.user.db);
  try {
    res.data = await userService.createUser(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

/* This function is used to fetch user.
 * @param {*} req
 * @param {*} res
 */
async function getUser(req, res, next) {
  const userService = new UserService(req.user.db);
  try {
    res.data = await userService.getUser();
    next();
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  const userService = new UserService(req.user.db);
  try {
    await userService.updateUser(req.body);
    res.data = { message: 'user informantion updated' };
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * This function is used to insert newly private account for a user
 * req.body = {
 *  address: '0x256140f466b2e56E3ae0055551591FE46664976d', // this is the newly created private account
 *  password: '1535612512928', // and password used to create private account
 * }
 * req.headers.address = '0xE237b19f7a9f2E92018a68f4fB07C451F578fa26' // this is user public account
 * @param {*} req
 * @param {*} res
 */
async function insertPrivateAccountHandler(req, res, next) {
  const userService = new UserService(req.user.db);
  try {
    res.data = await userService.insertPrivateAccountHandler(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

async function configureDBconnection(req, res, next) {
  const {name, password} = req.body;
  try {
    const connection = await UserService.setDBconnection(name, password);
    req.user.connection = connection;
    next();
  } catch (err) {
    next(err);
  }
}

export default function(router) {
  router.post('/users', createUser);
  router.route('/users/:name')
    .get(getUser)
    .patch(updateUser);

  router.post('/users/:name/private-accounts', insertPrivateAccountHandler);
  router.post('/db-connection', configureDBconnection, setDB, getUser);
}

