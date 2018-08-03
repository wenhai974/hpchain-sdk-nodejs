'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;

proto.contractCreateOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      initBalance: {
        required: true,
        numeric: true,
      },
      payload: {
        required: true,
        string: true,
      },
      sourceAddress: {
        required: false,
        string: true,
        address: true,
      },
      metadata: {
        required: false,
        string: true,
      },
      initInput: {
        required: false,
        string: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    return this._responseData({
      operation: {
        type: 'contractCreate',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};

proto.contractInvokeByAssetOperation = function* (args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      contractAddress: {
        required: true,
        address: true,
      },
      sourceAddress: {
        required: false,
        address: true,
      },
      code: {
        required: true,
        string: true,
      },
      issuer: {
        required: true,
        string: true,
        address: true,
      },
      assetAmount: {
        required: true,
        numeric: true,
      },
      metadata: {
        required: false,
        string: true,
      },
      input: {
        required: false,
        string: true,
      },
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    if (args.sourceAddress && args.destAddress === args.sourceAddress) {
      return this._responseError(errors.SOURCEADDRESS_EQUAL_DESTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(args.contractAddress);

    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    return this._responseData({
      operation: {
        type: 'contractInvokeByAsset',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};

proto.contractInvokeByBUOperation = function* (args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      contractAddress: {
        required: true,
        address: true,
      },
      sourceAddress: {
        required: false,
        address: true,
      },
      buAmount: {
        required: false,
        numeric: true,
      },
      input: {
        required: false,
        string: true,
      },
      metadata: {
        required: false,
        string: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    if (args.sourceAddress && args.destAddress === args.sourceAddress) {
      return this._responseError(errors.SOURCEADDRESS_EQUAL_DESTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(args.contractAddress);

    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    return this._responseData({
      operation: {
        type: 'contractInvokeByBU',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};