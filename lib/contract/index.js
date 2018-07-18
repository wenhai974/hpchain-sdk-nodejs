'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const long = require('long');
const JSONbig = require('json-bigint');
const { keypair } = require('bumo-encryption');
const errors = require('../exception');

module.exports = Contract;

function Contract(options) {
  if (!(this instanceof Contract)) {
    return new Contract(options);
  }

  this.options = options;
}

const proto = Contract.prototype;

merge(proto, require('../common/util'));

proto.getInfo = function* (contractAddress) {
  if (!keypair.checkAddress(contractAddress)) {
    return this._responseError(errors.INVALID_ADDRESS_ERROR);
  }

  const res = yield this._request('get', 'getAccount', {
    address: contractAddress,
  });

  if (res.error_code !== 0) {
    return this._responseError(errors.ACCOUNT_NOT_EXIST);
  }
  const result = res.result;

  if (result.contract && result.contract.payload) {
    return this._responseData({
      contract : {
        type: 0,
        payload: result.contract.payload,
      },
    });
  }

  return this._responseData({});
};

proto.checkValid = function* (contractAddress) {
  if (!keypair.checkAddress(contractAddress)) {
    return this._responseError(errors.INVALID_ADDRESS_ERROR);
  }

  const data = yield this.getInfo(contractAddress);

  if (data.errorCode !== 0) {
    return this._responseError(errors.ACCOUNT_NOT_EXIST);
  }

  const result = data.result;

  if (result.contract) {
    return this._responseData({
      isValid: true,
    });
  }

  return this._responseData({
    isValid: false,
  });
};

wrap(proto);