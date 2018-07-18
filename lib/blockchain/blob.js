'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const errors = require('../exception');

module.exports = Blob;

function Blob(options) {
  if (!(this instanceof Blob)) {
    return new Blob(options);
  }

  this.options = options;
}

const proto = Blob.prototype;

merge(proto, require('../common/util'));

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

proto.checkStatus = function* () {
  try {
    const data = yield this._request('get', 'getModulesStatus');
    const info = data.ledger_manager;

    if (info.chain_max_ledger_seq === info.ledger_sequence) {
      return this._responseData({
        isSynchronous: true,
      });
    }
    return this._responseData({
      isSynchronous: false,
    });
  } catch (err) {
    throw err;
  }
};

proto.getNumber = function* () {
  try {
    return yield this._getBlockNumber();
  } catch (err) {
    throw err;
  }
};

wrap(proto);
