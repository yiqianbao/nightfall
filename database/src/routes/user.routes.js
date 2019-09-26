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
  router.route('/users')
    .post(createUser)
    .get(getUser);

  router.post('/dbConnection', configureDBconnection, setDB, getUser);
}

