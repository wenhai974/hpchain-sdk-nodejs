'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;

proto.logCreateOperation = function(args) {
  try {
    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }


    const schema = {
      sourceAddress: {
        required: false,
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
        hex: true,
      }
    };

    if (!this._validate(args, schema)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    return {
      type: 'createLog',
      data: args,
    }
  } catch (err) {
    throw err;
  }
};