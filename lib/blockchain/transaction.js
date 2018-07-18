'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const long = require('long');
const humps = require('humps');
const JSONbig = require('json-bigint');
const errors = require('../exception');


module.exports = Transaction;

function Transaction(options) {
  if (!(this instanceof Transaction)) {
    return new Transaction(options);
  }

  this.options = options;
}

const proto = Transaction.prototype;

merge(proto, require('../common/util'));

proto.buildBlob = function(args) {
  try {
    const schema = {
      sourceAddress: {
        required: true,
        string: true,
        address: true,
      },
      gasPrice: {
        required: true,
        numeric: true,
      },
      feeLimit: {
        required: true,
        numeric: true,
      },
      nonce: {
        required: false,
        numeric: true,
      },
      ceilLedgerSeq: {
        required: false,
        numeric: true,
      },
      operations: {
        required: true,
        operations: true,
      },
      metadata: {
        required: false,
        string: true,
        hex: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    return this._responseData(this._buildBlob(args));
  } catch (err) {
    throw err;
  }
};

proto.sign = function(args) {
  // privateKeys, blob
  try {
    const schema = {
      privateKeys: {
        required: true,
        privateKeys: true,
      },
      blob: {
        required: true,
        hex: true,
      },
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    return this._responseData(this._signBlob(args));
  } catch (err) {
    throw err;
  }

};

// blob, signData, publicKey
proto.submit = function* (args) {
  // blob, signature
  const schema = {
    signature: {
      required: true,
      signatures: true,
    },
    blob: {
      required: true,
      hex: true,
    },
  };

  if (!this._validate(args, schema).tag) {
    const msg = this._validate(args, schema).msg;
    return this._responseError(errors[msg]);
  }

  args = humps.decamelizeKeys(args, { separator: '_' });
  return yield this._submit(args);
};

proto.evaluationFee = function* (args) {
  try {
    let { sourceAddress, nonce, operation, signtureNumber, metadata } = args;
    const schema = {
      sourceAddress: {
        required: true,
        string: true,
        address: true,
      },
      nonce: {
        required: true,
        string: true,
        numeric: true,
      },
      operation: {
        required: true,
        // string: true,
      },
      signtureNumber: {
        required: false,
        string: true,
        numeric: true,
      },
      metadata: {
        required: false,
        string: true,
        hex: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    const operationObj = this._buildOperation(operation.type, operation.data);

    if (operationObj.metadata) {
      operationObj.metadata = this._bufToHex(operationObj.metadata);
    }

    let operationMsg = humps.decamelizeKeys(operationObj, { separator: '_' });
    // convert long to int
    operationMsg = this._longToInt(operationMsg);
    signtureNumber = signtureNumber || 1;

    // metadata = Buffer.from((metadata || ''), 'utf8').toString('hex');

    let data = {
      items: [
        {
          transaction_json: {
            source_address: sourceAddress,
            metadata: metadata,
            nonce: nonce,
            operations: [ operationMsg ],
          },
          signature_number: signtureNumber,
        }
      ]
    };

    data = JSONbig.stringify(data);
    const response = yield this._request('post', 'testTransaction', data);
    if (is.object(response)) {
      const info = response;

      if (info.error_code === 0) {
        if (info.result.txs && info.result.txs.length > 0) {
          const fee = info.result.txs[0].transaction_env.transaction;
          return this._responseData({
            feeLimit: fee.fee_limit,
            gasPrice: fee.gas_price,
          });
        }
      }

      let err = {};
      switch (info.error_code) {
        case 93:
          err = errors.NOT_ENOUGH_WEIGHT;
          break;
        case 99:
          err = errors.NONCE_INCORRECT;
          break;
        case 100:
          err = errors.BU_IS_NOT_ENOUGH;
          break;
        case 101:
          err = errors.SOURCEDEST_EQUAL;
          break;
        case 102:
          err = errors.DEST_ACCOUNT_EXISTS;
          break;
        case 103:
          err = errors.ACCOUNT_NOT_EXIST;
          break;
        case 104:
          err = errors.ACCOUNT_ASSET_LOW_RESERVE;
          break;
        case 106:
          err = errors.ACCOUNT_INIT_LOW_RESERVE;
          break;
        case 111:
          err = errors.FEE_NOT_ENOUGH;
          break;
        case 160:
          err = errors.DISCARD_TRANSACTION;
          break;
        default:
          err = errors.TRANSACTION_FAIL;
      }

      return this._responseError(err);
    }
  } catch (err) {
    throw err;
  }
};

proto.getInfo = function* (hash) {
  try {
    if (typeof hash === 'undefined') {
      throw new Error('require transactionHash');
    }

    if (!is.string(hash) || this._isEmptyString(hash)) {
      throw new Error('transactionHash must be a non-empty string');
    }

    const data = yield this._request('get', 'getTransactionHistory', {
      hash: hash,
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


wrap(proto);
