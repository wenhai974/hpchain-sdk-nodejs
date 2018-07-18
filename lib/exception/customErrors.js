'use strict';
// custom error code: from 15001 to 17000
module.exports = {
  ACCOUNT_NOT_EXIST: {
    CODE: 15001,
    MSG: 'Account not exist',
  },
  FEE_NOT_ENOUGH: {
    CODE: 15002,
    MSG: 'Fee not enough',
  },
  TRANSACTION_FAIL: {
    CODE: 15003,
    MSG: 'Transaction fail',
  },
  NONCE_TOO_SMALL: {
    CODE: 15004,
    MSG: '`nonce` too small',
  },
  NOT_ENOUGH_WEIGHT: {
    CODE: 15005,
    MSG: 'Not enough weight',
  },
  INVALID_NUMBER_OF_ARG: {
    CODE: 15006,
    MSG: 'Invalid number of arguments to the function',
  },
  INVALID_TYPE_OF_ARG: {
    CODE: 15007,
    MSG: 'Invalid type of argument to the function',
  },
  ARG_CAN_NOT_BE_EMPTY: {
    CODE: 15008,
    MSG: 'Argument cannot be empty',
  },
  INTERNAL_ERROR: {
    CODE: 15009,
    MSG: 'Internal Server Error',
  },
  NONCE_INCORRECT: {
    CODE: 15010,
    MSG: 'Nonce incorrect',
  },
  BU_IS_NOT_ENOUGH: {
    CODE: 15011,
    MSG: 'BU is not enough',
  },
  SOURCEDEST_EQUAL: {
    CODE: 15012,
    MSG: 'Source address equal to dest address',
  },
  DEST_ACCOUNT_EXISTS: {
    CODE: 15013,
    MSG: 'Dest account already exists',
  },
  QUERY_RESULT_NOT_EXIST: {
    CODE: 15014,
    MSG: 'query result not exist',
  },
  DISCARD_TRANSACTION: {
    CODE: 15015,
    MSG: 'Discard transaction, because of lower fee  in queue',
  },
  // ASSERTION_FAILED
  INVALID_ARGUMENTS: {
    CODE: 15016,
    MSG: 'Invalid arguments to the function',
  },
  FAIL: {
    CODE: 15017,
    MSG: 'Fail',
  },
  GAS_PRICE_LESS_THAN_DEFAULT: {
    CODE: 15018,
    MSG: 'Gas price is less than default value',
  },
  INVALID_FORMAT_OF_ARG: {
    CODE: 15019,
    MSG: 'Invalid format of argument to the function',
  },
  ACCOUNT_ASSET_LOW_RESERVE: {
    CODE: 15020,
    MSG: 'Account asset low reserve',
  },
  ACCOUNT_INIT_LOW_RESERVE: {
    CODE: 15021,
    MSG: 'Dest address init balance not enough for base_reserve (10000000)',
  },
  INVALID_OPERATIONS: {
    CODE: 15022,
    MSG: 'Invalid operation',
  },
  INVALID_AMOUNT: {
    CODE: 15023,
    MSG: 'Amount must between 1 and max(int64)',
  },
  INVALID_GASPRICE: {
    CODE: 15024,
    MSG: 'Gasprice must between 1 and max(int64)',
  },
  INVALID_FEELIMIT: {
    CODE: 15025,
    MSG: 'FeeLimit must between 1 and max(int64)',
  },
  INVALID_CEILLEDGERSEQ: {
    CODE: 15026,
    MSG: 'CeilLedgerSeq must between 1 and max(int64)',
  },
};
