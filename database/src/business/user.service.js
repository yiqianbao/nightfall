import { exec } from 'child_process';
import mongoose from 'mongoose';
import config from 'config';
import Utils from 'zkp-utils';

import { COLLECTIONS } from '../common/constants';
import dbConnections from '../common/dbConnections';
import { userMapper } from '../mappers';

const mongo = config.get('mongo');
const utils = Utils('/app/config/stats.json');

function updateUserRole() {
  return new Promise((resolve, reject) =>
    exec(
      `mongo ${mongo.databaseName} --host=${mongo.host} -u ${mongo.admin} -p ${mongo.adminPassword} setup-mongo-acl-for-new-users.js`,
      err => (err ? reject(err) : resolve()),
    ),
  );
}

export default class UserService {
  constructor(_db) {
    this.db = _db;
  }

  /**
   * This function returns a user matching a public key
   * @param {object} options - an object containing public key
   * @returns {object} a user document matching the public key
   */
  getUser() {
    return this.db.findOne(COLLECTIONS.USER);
  }

  /**
   * This function will create a user document
   * @param {object} data - data contains user details
   * @returns {object} a user object
   */
  async createUser(data) {

    data.secretkey = await utils.rndHex(27);
    data.publickey = utils.hash(data.secretkey);

    const mappedData = userMapper(data);

    await this.db.addUser(data.name, data.password);
    await updateUserRole();
    return this.db.saveData(COLLECTIONS.USER, mappedData);
  }

  /**
   * This function will update user
   * @param {Object} data
   * @returns {Promise}
   */
  async updateUser(data) {
    const mappedData = userMapper(data);
    return this.db.updateData(
      COLLECTIONS.USER,
      {},
      mappedData,
    );
  }

  /**
   * This fucntion is used to add private ethereum accounts to a public account
   * @param {string} account - public accunt
   * @param {object} privateAccountDetails - contains ethereum private account and password
   * @returns {string} a account
   */
  async insertPrivateAccountHandler({ address, password }) {
    const updateData = {
      $push: {
        accounts: { address, password },
      },
    };
    return await this.db.updateData(COLLECTIONS.USER, {}, updateData);
  }

  static async setDBconnection(name, password) {
    if (!password) throw new Error('Password is empty');

    if (!dbConnections[name]) {
      dbConnections[name] = await mongoose.createConnection(
        `mongodb://${name}:${password}@${mongo.host}:${mongo.port}/${mongo.databaseName}`,
        { useNewUrlParser: true },
      );
    }
    return dbConnections[name];
  }
}
