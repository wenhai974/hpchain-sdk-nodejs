'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;


// initBalance int64 必填，给合约账户的初始化资产，大小[1, max(64)]
// name String 必填，ctp10Token名称，长度[1, 1024]
// symbol String 必填，ctp10Token符号，长度[1, 1024]
// decimals int 必填，ctp10Token数量的精度，大小[0, 8]
// totalSupply String 必填，ctp10Token发行的总供应量，大小[1, max(int64)]
// sourceAddress String 选填，发起该操作的源账户地址
// metadata String 选填，备注

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
