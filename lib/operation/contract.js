'use strict';

const errors = require('../exception');

const proto = exports;

proto.contractCreateOperation = function(args) {
  try {
    const schema = {
      sourceAddress: {
        required: false,
        string: true,
        address: true,
      },
      initBalance: {
        required: true,
        numeric: true,
      },
      payload: {
        required: true,
        string: true,
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

    return {
      type: 'contractCreate',
      data: args,
    };
  } catch (err) {
    throw err;
  }
};

proto.contractInvokeByAssetOperation = function() {

};

proto.contractInvokeByBU = function() {

};
