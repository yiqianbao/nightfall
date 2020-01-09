import { ftMapper } from '../mappers';
import FtTransactionService from './ft-transaction.service';

export default class FtService {
  constructor(_db) {
    this.db = _db;
    this.ftTransactionService = new FtTransactionService(_db);
  }

  /**
   * This function insert ERC-20 (ft) transaction
   * in ft_transction collection
   * @param {object} data
   */
  insertFTokenTransaction(data) {
    const { isReceived, isTransferred, isBurned } = data;
    const mappedData = ftMapper(data);

    if (isReceived)
      return this.ftTransactionService.insertTransaction({
        ...mappedData,
        transaction_type: 'transfer_incoming',
      });
    if (isTransferred)
      return this.ftTransactionService.insertTransaction({
        ...mappedData,
        transaction_type: 'transfer_outgoing',
      });
    if (isBurned)
      return this.ftTransactionService.insertTransaction({
        ...mappedData,
        transaction_type: 'burn',
      });

    return this.ftTransactionService.insertTransaction({
      ...mappedData,
      transaction_type: 'mint',
    });
  }

  /**
   * This function fetch ERC-20 (ft) transactions
   * in ft_transction collection
   * @param {object} query
   */
  getFTTransactions(query) {
    return this.ftTransactionService.getTransactions(query);
  }
}
