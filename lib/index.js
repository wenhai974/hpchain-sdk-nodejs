'use strict';

const merge = require('merge-descriptors');
const wrap = require('co-wrap-all');
const is = require('is-type-of');
const Account = require('./account');
const Asset = require('./asset');

module.exports = BUMOSDK;

function BUMOSDK(options) {
  if (!(this instanceof BUMOSDK)) {
    return new BUMOSDK(options);
  }

  if (options && options.inited) {
    this.options = options;
  } else {
    this.options = BUMOSDK.initOptions(options);
  }

	this.account = new Account(this.options);
	this.asset = new Asset(this.options);
}

BUMOSDK.initOptions = function initOptions(options) {
  if (!is.object(options)) {
    throw new Error('options is require, it must be an object');
  }

  if (!is.string(options.host)) {
    throw new Error('host must be a non-empty string');
  }

  const opts = {};

  Object.keys(options).forEach(key => {
    if (options[key] !== undefined) {
      opts[key] = options[key];
    }
  });

  opts.secure = opts.secure || false;
  opts.inited = true;
  return opts;
};

const proto = BUMOSDK.prototype;

merge(proto, require('./util'));
merge(proto, require('./block'));
merge(proto, require('./transaction'));

wrap(proto);
