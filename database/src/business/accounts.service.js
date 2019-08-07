/* eslint-disable camelcase */

import enums from '../common/constants.json';
import userMapper from '../mappers/user';

export default class AccountService {
  constructor(_db) {
    this.db = _db;
  }

  /**
   * This function returns a user matching a public key
   * @param {object} options - an object containing public key
   * @returns {object} a user document matching the public key
   */
  async getUser(options) {
    try {
      const user = await this.db.findOne(enums.COLLECTIONS.USER, options);
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * This function will create a user document
   * @param {object} data - data contains user details
   * @returns {object} a user object
   */
  async createAccount(data) {
    try {
      const mappedData = userMapper(data);
      await this.db.addUser(data.name, data.password);
      await this.db.updateUserRole();
      const user = await this.db.saveData(enums.COLLECTIONS.USER, mappedData);
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * This function will return all the user collection
   * @returns {array} a user collection
   */
  async getUsers() {
    try {
      const condition = {};
      const users = await this.db.getData(enums.COLLECTIONS.USER, condition);
      return Promise.resolve(users);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * This fucntion is used to add private ethereum accounts to a public account
   * @param {string} account - public accunt
   * @param {object} privateAccountDetails - contains ethereum private account and password
   * @returns {string} a account
   */
  async updateUserWithPrivateAccount(privateAccountDetails) {
    try {
      const updateData = {
        $push: {
          accounts: {
            address: privateAccountDetails.address,
            password: privateAccountDetails.password,
          },
        },
      };
      await this.db.updateData(enums.COLLECTIONS.USER, {}, updateData);
      return Promise.resolve(privateAccountDetails.address);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * This function will return all the private ethereum accounts assocated with a public ethereum account
   * @param {object} headers - req object header
   * @returns {array} all private accounts
   */
  async getPrivateAccounts(headers) {
    try {
      const condition = { address: headers.address };
      const addresses = await this.db.getData(enums.COLLECTIONS.USER, condition);
      return Promise.resolve(addresses);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * This function is used to get details of a private acocunts
   * @param {string} account - private ethereum account
   * @returns {object} a matched private account details
   */
  async getPrivateAccountDetails(account) {
    try {
      const condition = {
        'accounts.address': account,
      };
      const projection = {
        'accounts.$': 1,
      };
      const [{ accounts }] = await this.db.getData(enums.COLLECTIONS.USER, condition, projection);
      return Promise.resolve(accounts[0]);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateWhisperIdentity(shhIdentity) {
    try {
      return await this.db.updateData(
        enums.COLLECTIONS.USER,
        {},
        {
          shh_identity: shhIdentity,
        },
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getWhisperIdentity() {
    try {
      const users = await this.db.getData(enums.COLLECTIONS.USER);
      const shhIdentity = users[0].shh_identity || '';
      return Promise.resolve({ shhIdentity });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async addCoinShieldContractAddress({ contract_name, contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {
        'coin_shield_contracts.contract_address': { $ne: contract_address },
      },
      {
        $push: {
          coin_shield_contracts: {
            contract_name,
            contract_address,
          },
        },
      },
    );
    await this.selectCoinShieldContractAddress({ contract_address });
  }

  async updateCoinShieldContractAddress({
    contract_name,
    contract_address,
    isSelected,
    isCoinShieldPreviousSelected,
  }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {
        'coin_shield_contracts.contract_address': contract_address,
      },
      {
        $set: {
          [contract_name !== undefined
            ? 'coin_shield_contracts.$.contract_name'
            : undefined]: contract_name,
        },
      },
    );
    if (isSelected) await this.selectCoinShieldContractAddress({ contract_address });
    else if (isCoinShieldPreviousSelected)
      await this.selectCoinShieldContractAddress({ contract_address: null });
  }

  async selectCoinShieldContractAddress({ contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {},
      {
        selected_coin_shield_contract: contract_address,
      },
    );
  }

  async deleteCoinShieldContractAddress({ contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {},
      {
        $pull: {
          coin_shield_contracts: { contract_address },
        },
      },
    );

    const toUpdate = await this.db.findOne(enums.COLLECTIONS.USER, {
      selected_coin_shield_contract: contract_address,
    });

    if (!toUpdate) return null;
    await this.selectCoinShieldContractAddress({ contract_address: null });
    return toUpdate;
  }

  async addTokenShieldContractAddress({ contract_name, contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {
        'token_shield_contracts.contract_address': { $ne: contract_address },
      },
      {
        $push: {
          token_shield_contracts: {
            contract_name,
            contract_address,
          },
        },
      },
    );
    await this.selectTokenShieldContractAddress({ contract_address });
  }

  async updateTokenShieldContractAddress({
    contract_name,
    contract_address,
    isSelected,
    isTokenShieldPreviousSelected,
  }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {
        'token_shield_contracts.contract_address': contract_address,
      },
      {
        $set: {
          [contract_name !== undefined
            ? 'token_shield_contracts.$.contract_name'
            : undefined]: contract_name,
        },
      },
    );
    if (isSelected) await this.selectTokenShieldContractAddress({ contract_address });
    else if (isTokenShieldPreviousSelected)
      await this.selectTokenShieldContractAddress({ contract_address: null });
  }

  async selectTokenShieldContractAddress({ contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {},
      {
        selected_token_shield_contract: contract_address,
      },
    );
  }

  async deleteTokenShieldContractAddress({ contract_address }) {
    await this.db.updateData(
      enums.COLLECTIONS.USER,
      {},
      {
        $pull: {
          token_shield_contracts: { contract_address },
        },
      },
    );

    const toUpdate = await this.db.findOne(enums.COLLECTIONS.USER, {
      selected_token_shield_contract: contract_address,
    });

    if (!toUpdate) return null;
    await this.selectTokenShieldContractAddress({ contract_address: null });
    return toUpdate;
  }
}
