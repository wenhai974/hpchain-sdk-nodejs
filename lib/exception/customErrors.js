'use strict';
// custom error code: from 15001 to 17000
module.exports = {
  ACCOUNT_NOT_EXIST: {
    CODE: 15001,
    MSG: 'account not exist',
  },
  INVALID_NUMBER_OF_ARG: {
    CODE: 15006,
    MSG: 'invalid number of arguments to the function',
  },
  QUERY_RESULT_NOT_EXIST: {
    CODE: 15014,
    MSG: 'query result not exist',
  },
  INVALID_ARGUMENTS: {
    CODE: 15016,
    MSG: 'invalid arguments to the function',
  },
  FAIL: {
    CODE: 15017,
    MSG: 'fail',
  },
  INVALID_FORMAT_OF_ARG: {
    CODE: 15019,
    MSG: 'invalid format of argument to the function',
  },
  INVALID_OPERATIONS: {
    CODE: 15022,
    MSG: 'invalid operation',
  },
  INVALID_SIGNATURE_ERROR: {
    CODE: 15027,
    MSG: 'invalid signature',
  },
  INVALID_METADATA_ERROR: {
    CODE: 15028,
    MSG: 'invalid metadata',
  },
  INVALID_INPUT_ERROR: {
    CODE: 15028,
    MSG: 'invalid input',
  },
  INVALID_DELETEFLAG_ERROR: {
    CODE: 15029,
    MSG: 'deleteFlag must be a boolean',
  },
  INVALID_CONTRACT_BU_AMOUNT_ERROR: {
    CODE: 15030,
    MSG: 'buAmount must between 0 and max(int64)',
  },
  INVALID_CONTRACT_ASSET_AMOUNT_ERROR: {
    CODE: 15031,
    MSG: 'assetAmount must between 0 and max(int64)',
  },
};
