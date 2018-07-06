'use strict';

const request = require('request-promise');
const is = require('is-type-of');
const long = require('long');
const JSONbig = require('json-bigint');
const BigNumber = require('bignumber.js');
const { keypair } = require('bumo-encryption');
const errors = require('./errors');

const proto = exports;

/**
 * GET/POST request
 *
 * @param  {String} method
 * @param  {String} path
 * @param  {Object} data
 * @return {Object}
 */
proto._request = function* (method, path, data = {}) {
  try {
    const protocol = this.options.secure ? 'https://' : 'http://';
    const uri = `${protocol}${this.options.host}/${path}`;

    if (!is.string(method) || this._isEmptyString(method)) {
      throw new Error('method must be a non-empty string');
    }

    if (!is.string(path) || this._isEmptyString(path)) {
      throw new Error('path must be a non-empty string');
    }

    // if (data && !is.object(data)) {
    //   throw new Error('data must be an object');
    // }

    const methods = [ 'get', 'post' ];

    if (!methods.includes(method.toLowerCase())) {
      throw new Error(`${method} http method is not supported`);
    }

    const options = {
      method,
      uri,
    };

    if (method === 'get') {
      options.qs = data;
    }

    if (method === 'post') {
      options.body = data;
    }
    const result = yield request(options);
    return JSONbig.parse(result);
  } catch (err) {
    throw err;
  }
};

proto._response = function(obj) {
  const data = {
    error_code: obj.error_code || 0,
    msg: obj.error_desc || 'Success',
  };

  if (is.object(obj) && obj.error_code) {
    if (obj.error_code === 0) {
      data.data = obj.result || {};
    } else {
      data.msg = obj.error_desc || '';
      data.data = {};
    }
  } else {
    data.data = obj;
  }

  return JSONbig.stringify(data);
};

proto._getBlockNumber = function* () {
  try {
    const data = yield this._request('get', 'getLedger');

    if (data && data.error_code === 0) {
      const seq = data.result.header.seq;
      return this._responseData(seq);
    } else {
      return this._responseError(errors.INTERNAL_ERROR);
    }
  } catch (err) {
    throw err;
  }
};

proto._isEmptyString = function(str) {
  if (!is.string(str)) {
    throw new Error('str must be a string');
  }
  return (str.trim().length === 0);
};

proto._postData = function(blob, signData, publicKey) {
  const data = {
    items: [
      {
        transaction_blob: blob,
        signatures: [{
          sign_data: signData,
          public_key: publicKey,
        }],
      },
    ],
  };
  return JSONbig.stringify(data);
};

proto._submitTransaction = function* (postData) {
  try {
    const result = yield this._request('post', 'submitTransaction', postData);
    return this._response(result);
  } catch (err) {
    throw err;
  }
};

proto._isBigNumber = function (object) {
  return object instanceof BigNumber ||
      (object && object.constructor && object.constructor.name === 'BigNumber');
};

proto._toBigNumber = function(number) {
  number = number || 0;
  //
  if (this._isBigNumber(number)) {
    return number;
  }
  return new BigNumber(number);
};

proto._verifyValue = function(str) {
  const reg = /^[1-9]\d*$/;
  return (
      is.string(str) &&
      reg.test(str) &&
      long.fromValue(str).greaterThan(0) &&
      long.fromValue(str).lessThanOrEqual(long.MAX_VALUE)
  );
};

proto._checkParams = function (obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let value = obj[prop];
      if (!is.undefined(value)) {
        if (!this._verifyValue(value)) {
          throw new Error(errors.INVALID_FORMAT_OF_ARG.msg);
        }
      }
    }
  }
};

proto._getDefaultValue = function* () {
  try {
     let ledgerInfo = yield this._request('get', 'getLedger', {
      with_fee: true,
    });
    const gasPrice = long.fromValue(ledgerInfo.result.fees.gas_price);
    const feeLimit = long.fromValue(1000).mul(gasPrice);
    return {
      gasPrice,
      feeLimit,
    }
  } catch (err) {
    throw err;
  }
};

proto._responseData = function(data) {
  const error_code = 0;
  const msg = 'Success';
  return JSONbig.stringify({
    error_code,
    msg,
    data,
  });
};

proto._responseError = function(message, data) {
  if (!message) {
    throw new Error('require message');
  }
  const error_code = message.code;

  return JSONbig.stringify({
    error_code,
    msg: message.msg,
    data: data || {},
  });
};

proto._submitTransaction = function* (data) {
  try {
    const res = yield this._request('post', 'submitTransaction', data);
    const results = res.results;
    if (Array.isArray(results) && results.length > 0) {
      const info = results[0];

      switch (info.error_code) {
        case 0:
          return this._responseData({
            hash: info.hash,
          });
        case 93:
          return this._responseError(errors.NOT_ENOUGH_WEIGHT);
        case 99:
          return this._responseError(errors.NONCE_INCORRECT);
        case 100:
          return this._responseError(errors.BU_IS_NOT_ENOUGH);
        case 101:
          return this._responseError(errors.SOURCEDEST_EQUAL);
        case 102:
          return this._responseError(errors.DEST_ACCOUNT_EXISTS);
        case 103:
          return this._responseError(errors.ACCOUNT_NOT_EXIST);
        case 111:
          return this._responseError(errors.FEE_NOT_ENOUGH);
        case 160:
          return this._responseError(errors.DISCARD_TRANSACTION);
        default:
          return this._responseError(errors.TRANSACTION_FAIL);
      }
    }
    return this._responseError(errors.TRANSACTION_FAIL);
  } catch (err) {
    throw new Error(err);
  }

};
