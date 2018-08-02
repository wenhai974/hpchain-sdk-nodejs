'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;

proto.ctp10TokenIssueOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      initBalance: {
        required: true,
        numeric: true,
      },
      name: {
        required: true,
        string: true,
      },
      symbol: {
        required: true,
        string: true,
      },
      totalSupply: {
        required: true,
        numeric: true,
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
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    const { decimals } = args;

    if (!decimals || typeof decimals !== 'number' || decimals < 0 || decimals > 8) {
      return this._responseError(errors.INVALID_TOKEN_DECIMALS_ERROR);
    }

    return this._responseData({
      operation: {
        type: 'ctp10TokenIssue',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};


proto.ctp10TokenAssignOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      contractAddress: {
        required: true,
        address: true,
      },
      destAddress: {
        required: true,
        address: true,
      },
      tokenAmount: {
        required: true,
        numeric: true,
      },
      sourceAddress: {
        required: false,
        address: true,
      },
      metadata: {
        required: false,
        string: true,
      },
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    return this._responseData({
      operation: {
        type: 'ctp10TokenAssign',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};


proto.ctp10TokenTransferOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      contractAddress: {
        required: true,
        address: true,
      },
      destAddress: {
        required: true,
        address: true,
      },
      tokenAmount: {
        required: true,
        numeric: true,
      },
      sourceAddress: {
        required: false,
        address: true,
      },
      metadata: {
        required: false,
        string: true,
      },
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    return this._responseData({
      operation: {
        type: 'ctp10TokenTransfer',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};
