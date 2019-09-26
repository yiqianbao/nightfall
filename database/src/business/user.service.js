import { exec } from 'child_process';
import mongoose from 'mongoose';
import config from 'config';
import { COLLECTIONS } from '../common/constants';
import dbConnections from '../common/dbConnections';
import { userMapper } from '../mappers';

const mongo = config.get('mongo');

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
  getUser(options) {
    return this.db.findOne(COLLECTIONS.USER, options);
  }

  /**
   * This function will create a user document
   * @param {object} data - data contains user details
   * @returns {object} a user object
   */
  async createUser(data) {
    const mappedData = await userMapper(data);
    await this.db.addUser(data.name, data.password);
    await updateUserRole();
    return this.db.saveData(COLLECTIONS.USER, mappedData);
  }

  static async setDBconnection(name, password) {
    if (!dbConnections[name]) {
      dbConnections[name] = await mongoose.createConnection(
        `mongodb://${name}:${password}@${mongo.host}:${mongo.port}/${mongo.databaseName}`,
        { useNewUrlParser: true },
      );
    }
    return dbConnections[name];
  }
}
