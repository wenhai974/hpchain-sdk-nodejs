'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const long = require('long');
const JSONbig = require('json-bigint');
const { keypair } = require('bumo-encryption');
const errors = require('../exception');

module.exports = Log;

function Log(options) {
  if (!(this instanceof Log)) {
    return new Log(options);
  }

  this.options = options;
}

const proto = Log.prototype;

merge(proto, require('../common/util'));

proto.create = function(args) {
  try {
    const { sourceAddress, topic, data, metadata } = args;
    const schema = {
      sourceAddress: {
        required: false,
        string: true,
        address: true,
      },
      topic: {
        required: true,
        string: true,
      },
      data: {
        required: true,
        string: true,
      },
      metadata: {
        required: false,
        string: true,
        hex: true,
      }
    };

    if (!this._validate(args, schema)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const operationData =  this._buildOperation('createLog', {
      sourceAddress,
      topic,
      data,
      metadata,
    });
    return this._responseData(operationData);
  } catch (err) {
    throw err;
  }
};

wrap(proto);