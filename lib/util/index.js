'use strict';

const wrap = require('co-wrap-all');
const merge = require('merge-descriptors');
const BigNumber = require('bignumber.js');
const is = require('is-type-of');
const long = require('long');

module.exports = Util;

function Util(options) {
  if (!(this instanceof Util)) {
    return new Util(options);
  }

  this.options = options;
}

const proto = Util.prototype;

merge(proto, require('../common/util'));

proto.isBigNumber = function (object) {
  return this._isBigNumber(object);
};

proto.toBigNumber = function(data) {
  return this._toBigNumber(data);
};

proto.utfToHex = function(str) {
  if (!is.string(str)) {
    return;
  }

  return Buffer.from(str, 'utf8').toString('hex');
};

proto.hexToUtf = function(str) {
  if (!is.string(str) ||
      str === '' ||
      !this._isHexString(str)) {
    return;
  }

  return Buffer.from(str, 'hex').toString('utf8');
};

proto.buToMo = function(bu) {
  if (!this._isAvailableBu(bu)) {
    return '';
  }

  const oneMo = Math.pow(10, 8);
  const mo = new BigNumber(bu).times(oneMo);
  return mo.toString();
};

proto.moToBu = function(mo) {
  if (!this._isAvailableValue(mo)) {
    return '';
  }

  const oneMo = Math.pow(10, 8);
  const bu = new BigNumber(mo).dividedBy(oneMo);
  return bu.toString();
};

wrap(proto);
