import { COLLECTIONS } from '../common/constants';
import { userMapper } from '../mappers';

export default class UserService {
  constructor(_db) {
    this.db = _db;
  }

  /**
   * This function returns a user matching a public key
   * @param {object} options - an object containing public key
   * @returns {object} a user document matching the public key
   */
  getUser(options) {
    return this.db.findOne(COLLECTIONS.USER, options);
  }

  /**
   * This function will create a user document
   * @param {object} data - data contains user details
   * @returns {object} a user object
   */
  async createAccount(data) {
    const mappedData = await userMapper(data);
    await this.db.addUser(data.name, data.password);
    await updateUserRole();
    return this.db.saveData(COLLECTIONS.USER, mappedData);
  }
}
