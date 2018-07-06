'use strict';

const is = require('is-type-of');
const errors = require('./errors');

const proto = exports;

proto.getBlock = function* (blockNumber) {
  try {
    if (typeof blockNumber === 'undefined') {
      throw new Error('require blockNumber');
    }

    if (!is.int(blockNumber) || blockNumber < 0) {
      throw new Error('blockNumber must be an integer and greater than or equal to 0');
    }

    let data = yield this._request('get', 'getTransactionHistory', {
      ledger_seq: blockNumber
    });

    if (data.error_code === 0) {
      return this._responseData(data.result);
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);
  } catch (err) {
    throw err;
  }
};

proto.checkBlockStatus = function* () {
  try {
    const data = yield this._request('get', 'getModulesStatus');
    const info = data.ledger_manager;

    if (info.chain_max_ledger_seq === info.ledger_sequence) {
      return this._responseData(true);
    }
    return this._responseData(false);
  } catch (err) {
    throw err;
  }
};

proto.getBlockNumber = function* () {
  try {
    return yield this._getBlockNumber();
  } catch (err) {
    throw err;
  }
};
