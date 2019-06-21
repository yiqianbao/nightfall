/* eslint-disable  import/no-commonjs */
/* eslint-disable  no-param-reassign */
/* eslint-disable  new-cap */
/* eslint-disable  class-methods-use-this */

const { exec } = require('child_process');

let UserSchema = require('../models/user.model')
let CoinSchema = require('../models/coin.model')
let TokenSchema = require('../models/token.model')
let TokenTransactionSchema = require('../models/token-transaction.model')
let CoinTransactionSchema = require('../models/coin-transaction.model')
let PublicTokenSchema = require('../models/public_token.model')
let PublicTokenTransactionSchema = require('../models/public_token_transaction.model')
let PublicCoinTransactionSchema = require('../models/public_coin_transaction.model')

const config = require('../config').getProps()
module.exports = class DB {
  constructor(db, username) {
    this.database = db;
    this.username = username;
    if (!username) return;
    this.createTablesForUser();
  }

  createTablesForUser() {
    const { username, database } = this;
    this.Models = {
      User: database.model(`${username}_user`, UserSchema),
      Coin: database.model(`${username}_coin`, CoinSchema),
      Token: database.model(`${username}_token`, TokenSchema),
      Token_Transaction: database.model(`${username}_token_transaction`, TokenTransactionSchema),
      Coin_Transaction: database.model(`${username}_coin_transaction`, CoinTransactionSchema),
      Public_Token: database.model(`${username}_public_token`, PublicTokenSchema),
      Public_Token_Transaction: database.model(
        `${username}_public_token_transaction`,
        PublicTokenTransactionSchema,
      ),
      Public_Coin_Transaction: database.model(
        `${username}_public_coin_transaction`,
        PublicCoinTransactionSchema,
      ),
    };
  }

  async saveData(modelName, data) {
    try {
      const model = this.Models[modelName];
      const modelInstance = new model(data);
      const successData = await modelInstance.save();
      return Promise.resolve(successData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getData(modelName, query = {}) {
    try {
      const model = this.Models[modelName];
      const data = await model.find(query).exec();
      return Promise.resolve(data);
    } catch (e) {
      console.log('DB error', e);
      return Promise.reject(e);
    }
  }

  async getDbData(
    modelName,
    query,
    projection = { path: '', select: '' },
    sort = {},
    pageNo = 1,
    limit = 5,
  ) {
    try {
      console.log('pageNo', pageNo, 'limit', limit);
      if (!Number(pageNo)) pageNo = 1;
      if (!projection) projection = { path: '', select: '' };
      const model = this.Models[modelName];
      const data = await model
        .find(query)
        .limit(limit)
        .skip(limit * (pageNo - 1))
        .sort(sort)
        .populate(projection)
        .exec();
      const totalCount = await model
        .find(query)
        .countDocuments()
        .exec();
      return Promise.resolve({ data, totalCount });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getDbValues(modelName, query, projection, sort = {}, pageNo, limit) {
    try {
      const model = this.Models[modelName];
      const mQuery = model.find(query);
      if (limit) {
        mQuery.limit(limit);
      }
      if (pageNo) {
        mQuery.skip(limit * (pageNo - 1));
      }
      if (sort) {
        mQuery.sort(sort);
      }
      if (projection) {
        mQuery.populate(projection);
      }

      const data = await mQuery.exec();
      return Promise.resolve({ data });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async findOne(modelName, query) {
    try {
      const model = this.Models[modelName];
      const data = await model.findOne(query);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getListData(modelName, query, page) {
    try {
      const model = this.Models[modelName];
      const data = await model
        .find(query)
        .skip(page.index * page.size)
        .limit(page.size)
        .exec();
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateData(modelName, condition, updateData, options = { upsert: true }) {
    try {
      const model = this.Models[modelName];
      const data = await model.updateOne(condition, updateData, options);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async aggregation(modelName, condition, projection, options) {
    try {
      const model = this.Models[modelName];
      const pipeline = [{ $match: condition }];

      if (projection) pipeline.push(projection);

      if (options) pipeline.push(options);

      const data = await model.aggregate(pipeline);

      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async populate(modelName, data, populates) {
    try {
      const model = this.Models[modelName];
      return await model.populate(data, populates);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  addUser(name, password) {
    return new Promise((resolve, reject) => {
      this.database.db.addUser(
        name,
        password,
        {
          roles: [
            {
              role: 'read',
              db: config.mongo.databaseName,
            },
          ],
        },
        err => {
          if (err) return reject(err);
          resolve();
          return 0;
        },
      );
    });
  }

  updateUserRole() {
    return new Promise((resolve, reject) => {
      exec(
        `mongo nightfall --host=mongo -u ${config.mongo.admin} -p ${
          config.mongo.password
        } script_to_configure_roles.js`,
        err => {
          if (err) return reject(err);
          resolve();
          return 0;
        },
      );
    });
  }
};
