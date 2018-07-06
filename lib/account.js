'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const long = require('long');
const JSONbig = require('json-bigint');
const { keypair } = require('bumo-encryption');
const errors = require('./errors');

module.exports = Account;

function Account(options) {
  if (!(this instanceof Account)) {
    return new Account(options);
  }

  this.options = options;
}

const proto = Account.prototype;

merge(proto, require('./util'));

/**
 * Create account
 * @return {Object}
 */
proto.create = function* () {
  const kp = keypair.getKeyPair();
  const encPrivateKey = kp.encPrivateKey;
  const encPublicKey = kp.encPublicKey;
  const address = kp.address;

  return this._responseData({
    privateKey: encPrivateKey,
    publicKey: encPublicKey,
    address,
  });
};

/**
 * Check address
 * @param {String} address
 * @return {Boolean}
 */
proto.checkAddress = function* (address) {
  if (!keypair.checkAddress(address)) {
    return this._responseData(false);
  }
  return this._responseData(true);
};

/**
 * Get account information
 * @param  {String} address
 * @return {Object}
 */
proto.getInfo = function* (address) {
  if (!keypair.checkAddress(address)) {
    throw new Error('Invalid address');
  }

  const res = yield this._request('get', 'getAccount', { address });

  if (res.error_code !== 0) {
    return this._responseError(errors.ACCOUNT_NOT_EXIST);
  }

  let nonce =  res.result.nonce;

  if (nonce) {
    nonce = this._toBigNumber(nonce).plus(1);
  } else {
    nonce = this._toBigNumber(1);
  }

  return this._responseData({
    address: res.result.address,
    balance: res.result.balance,
    nonce,
    assets: res.result.assets || [],
  });
};

/**
 * Get account balance
 * @param  {String} address
 * @return {Object}
 */
proto.getBalance = function* (address) {
  if (!keypair.checkAddress(address)) {
    throw new Error('Invalid address');
  }

  let info = yield this.getInfo(address);
  info = JSONbig.parse(info);
  if (info.error_code === 0) {
    return this._responseData({
      balance: info.data.balance,
    });
  }

  return this._responseError(errors.ACCOUNT_NOT_EXIST);
};

wrap(proto);
