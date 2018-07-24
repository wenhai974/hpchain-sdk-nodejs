'use strict';
// custom error code: from 15001 to 17000
module.exports = {
  ACCOUNT_NOT_EXIST: {
    CODE: 15001,
    MSG: 'account not exist',
  },
  FEE_NOT_ENOUGH: {
    CODE: 15002,
    MSG: 'fee not enough',
  },
  TRANSACTION_FAIL: {
    CODE: 15003,
    MSG: 'transaction fail',
  },
  NONCE_TOO_SMALL: {
    CODE: 15004,
    MSG: '`nonce` too small',
  },
  NOT_ENOUGH_WEIGHT: {
    CODE: 15005,
    MSG: 'not enough weight',
  },
  INVALID_NUMBER_OF_ARG: {
    CODE: 15006,
    MSG: 'invalid number of arguments to the function',
  },
  INVALID_TYPE_OF_ARG: {
    CODE: 15007,
    MSG: 'invalid type of argument to the function',
  },
  ARG_CAN_NOT_BE_EMPTY: {
    CODE: 15008,
    MSG: 'argument cannot be empty',
  },
  INTERNAL_ERROR: {
    CODE: 15009,
    MSG: 'internal Server Error',
  },
  NONCE_INCORRECT: {
    CODE: 15010,
    MSG: 'nonce incorrect',
  },
  BU_IS_NOT_ENOUGH: {
    CODE: 15011,
    MSG: 'bu is not enough',
  },
  SOURCEDEST_EQUAL: {
    CODE: 15012,
    MSG: 'source address equal to dest address',
  },
  DEST_ACCOUNT_EXISTS: {
    CODE: 15013,
    MSG: 'dest account already exists',
  },
  QUERY_RESULT_NOT_EXIST: {
    CODE: 15014,
    MSG: 'query result not exist',
  },
  DISCARD_TRANSACTION: {
    CODE: 15015,
    MSG: 'discard transaction, because of lower fee  in queue',
  },
  // ASSERTION_FAILED
  INVALID_ARGUMENTS: {
    CODE: 15016,
    MSG: 'invalid arguments to the function',
  },
  FAIL: {
    CODE: 15017,
    MSG: 'fail',
  },
  GAS_PRICE_LESS_THAN_DEFAULT: {
    CODE: 15018,
    MSG: 'gas price is less than default value',
  },
  INVALID_FORMAT_OF_ARG: {
    CODE: 15019,
    MSG: 'invalid format of argument to the function',
  },
  ACCOUNT_ASSET_LOW_RESERVE: {
    CODE: 15020,
    MSG: 'account asset low reserve',
  },
  ACCOUNT_INIT_LOW_RESERVE: {
    CODE: 15021,
    MSG: 'dest address init balance not enough for base_reserve (10000000)',
  },
  INVALID_OPERATIONS: {
    CODE: 15022,
    MSG: 'invalid operation',
  },
  INVALID_AMOUNT: {
    CODE: 15023,
    MSG: 'amount must between 1 and max(int64)',
  },
  INVALID_GASPRICE: {
    CODE: 15024,
    MSG: 'gasprice must between 1 and max(int64)',
  },
  INVALID_FEELIMIT: {
    CODE: 15025,
    MSG: 'feeLimit must between 1 and max(int64)',
  },
  INVALID_CEILLEDGERSEQ: {
    CODE: 15026,
    MSG: 'ceilLedgerSeq must between 1 and max(int64)',
  },
  INVALID_SIGNATURE_ERROR: {
    CODE: 15027,
    MSG: 'invalid signature',
  },
  INVALID_METADATA_ERROR: {
    CODE: 15028,
    MSG: 'invalid metadata',
  },
};
