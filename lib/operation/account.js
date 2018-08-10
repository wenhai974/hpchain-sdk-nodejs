'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;

proto.accountActivateOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      sourceAddress: {
        required: false,
        address: true,
      },
      destAddress: {
        required: true,
        address: true,
      },
      initBalance: {
        required: true,
        numeric: true,
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

    return this._responseData({
      operation: {
        type: 'activateAccount',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};

proto.accountSetMetadataOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      key: {
        required: true,
        string: true,
      },
      version: {
        required: false,
        string: true,
      },
      sourceAddress: {
        required: false,
        address: true,
      },
      deleteFlag: {
        required: false,
        boolean: true,
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

    let value = args.value;

    if (!is.string(value) ||
        value.trim().length === 0 ||
        value.length > 256000) {
      return this._responseError(errors.INVALID_DATAVALUE_ERROR);
    }

    return this._responseData({
      operation: {
        type: 'accountSetMetadata',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};