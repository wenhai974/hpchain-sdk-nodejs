'use strict';

const errors = require('../exception');

const proto = exports;

proto.logCreateOperation = function(args) {
  try {
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

    return {
      type: 'createLog',
      data: args,
    }
  } catch (err) {
    throw err;
  }
};