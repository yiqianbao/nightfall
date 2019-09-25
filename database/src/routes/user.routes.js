import { UserService } from '../business';

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
    res.data = await userService.createAccount(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

/* This function is used to fetch user by name (login purpose).
 * req.params = { name: 'a' }
 * @param {*} req
 * @param {*} res
 */
async function getUserByName(req, res, next) {
  const userService = new UserService(req.user.db);
  try {
    res.data = await userService.getUser({ name: req.params.name });
    next();
  } catch (err) {
    next(err);
  }
}

export default function(router) {
  router.post('/users', createUser);
  router.get('/users/:name', getUserByName);
}

