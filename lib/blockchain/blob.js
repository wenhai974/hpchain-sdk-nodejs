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

proto.getTransactions = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      console.log(blockNumber)
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getTransactionHistory', {
      ledger_seq: blockNumber,
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

proto.getInfo = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getLedger', {
      seq: blockNumber,
    });

    if (data.error_code === 0) {
      const header = data.result.header;
      const closeTime = header.close_time;
      const number = header.seq;
      const txCount = header.tx_count;
      const version = header.version;

      return this._responseData({
        closeTime,
        number,
        txCount,
        version,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.getLatestInfo = function* () {
  try {
    const data = yield this._request('get', 'getLedger');

    if (data.error_code === 0) {
      const header = data.result.header;
      const closeTime = header.close_time;
      const number = header.seq;
      const txCount = header.tx_count;
      const version = header.version;

      return this._responseData({
        closeTime,
        number,
        txCount,
        version,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};

proto.getValidators = function* () {
  try {
    const data = yield this._request('get', 'getLedger', {
      with_validator: true,
    });

    if (data.error_code === 0) {
      const validatorsInfo = data.result.validators;
      let validators = [];
      if (!is.array(validatorsInfo) && validatorsInfo.length === 0) {
        validators = [];
      }
      validatorsInfo.forEach(item => {
        if (!item.pledge_coin_amount) {
          item.pledge_coin_amount = '0';
        }
        validators.push(item);
      });
      return this._responseData({
        validators,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.getLatestValidators = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getLedger', {
      seq: blockNumber,
      with_validator: true,
    });

    if (data.error_code === 0) {
      const validatorsInfo = data.result.validators;
      let validators = [];
      if (!is.array(validatorsInfo) && validatorsInfo.length === 0) {
        validators = [];
      }
      validatorsInfo.forEach(item => {
        if (!item.pledge_coin_amount) {
          item.pledge_coin_amount = '0';
        }
        validators.push(item);
      });
      return this._responseData({
        validators,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.getReward = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getLedger', {
      seq: blockNumber,
      with_block_reward: true,
    });

    if (data.error_code === 0) {
      // console.log(data)
      const result = data.result;
      const blockReward = result.block_reward;
      const validatorsReward = result.validators_reward;

      return this._responseData({
        blockReward,
        validatorsReward,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.getFees = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getLedger', {
      seq: blockNumber,
      with_fee: true,
    });

    if (data.error_code === 0) {
      // console.log(data)
      const result = data.result;
      const fees = result.fees;

      return this._responseData({
        fees,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.getLatestFees = function* (blockNumber) {
  try {
    if (!is.int(blockNumber) || blockNumber <= 0) {
      return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
    }

    const data = yield this._request('get', 'getLedger', {
      with_fee: true,
    });

    if (data.error_code === 0) {
      // console.log(data)
      const result = data.result;
      const fees = result.fees;

      return this._responseData({
        fees,
      });
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};



wrap(proto);
