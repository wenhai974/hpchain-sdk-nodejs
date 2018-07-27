'use strict';

module.exports = {
  ACCOUNT_CREATE_ERROR: {
    CODE: 11001,
    MSG: 'create account failed',
  },
  INVALID_SOURCEADDRESS_ERROR: {
    CODE: 11002,
    MSG: 'invalid sourceAddress',
  },
  INVALID_DESTADDRESS_ERROR: {
    CODE: 11003,
    MSG: 'invalid destAddress',
  },
  INVALID_INITBALANCE_ERROR: {
    CODE: 11004,
    MSG: 'initBalance must between 1 and max(int64)',
  },
  SOURCEADDRESS_EQUAL_DESTADDRESS_ERROR: {
    CODE: 11005,
    MSG: 'sourceAddress cannot be equal to destAddress',
  },
  INVALID_ADDRESS_ERROR: {
    CODE: 11006,
    MSG: 'invalid address',
  },
  CONNECTNETWORK_ERROR: {
    CODE: 11007,
    MSG: 'connect network failed',
  },
  INVALID_ISSUE_AMMOUNT_ERROR: {
    CODE: 11008,
    MSG: 'AssetAmount this will be issued mustbetween 1 and max(int64)',
  },
  NO_METADATA_ERROR: {
    CODE: 11010,
    MSG: 'this account does not have this metadata',
  },
  INVALID_DATAKEY_ERROR: {
    CODE: 11011,
    MSG: 'the length of key must between 1 and 1024',
  },
  INVALID_DATAVALUE_ERROR: {
    CODE: 11012,
    MSG: 'the length of value must between 0 and 256000',
  },
  INVALID_DATAVERSION_ERROR: {
    CODE: 11013,
    MSG: 'the version must be equal or bigger than 0',
  },
  INVALID_MASTERWEIGHT_ERROR: {
    CODE: 11015,
    MSG: 'masterWeight must between 0 and max(uint32)',
  },
  INVALID_SIGNER_ADDRESS_ERROR: {
    CODE: 11016,
    MSG: 'invalid signer address',
  },
  INVALID_SIGNER_WEIGHT_ERROR: {
    CODE: 11017,
    MSG: 'signer weight must between 0 and max(uint32)',
  },
  INVALID_TX_THRESHOLD_ERROR: {
    CODE: 11018,
    MSG: 'txThreshold must between 0 and max(int64)',
  },
  INVALID_OPERATION_TYPE_ERROR: {
    CODE: 11019,
    MSG: 'operation type must between 1 and 100',
  },
  INVALID_TYPE_THRESHOLD_ERROR: {
    CODE: 11020,
    MSG: 'typeThreshold must between 0 and max(int64)',
  },
  INVALID_ASSET_CODE_ERROR: {
    CODE: 11023,
    MSG: 'invalid code',
  },
  INVALID_ASSET_AMOUNT_ERROR: {
    CODE: 11024,
    MSG: 'assetAmount must between 1 and max(int64)',
  },
  INVALID_BU_AMOUNT_ERROR: {
    CODE: 11026,
    MSG: 'buAmount must between 1 and max(int64)',
  },
  INVALID_ISSUER_ADDRESS_ERROR: {
    CODE: 11027,
    MSG: 'invalid issuer address',
  },
  NO_SUCH_TOKEN_ERROR: {
    CODE: 11030,
    MSG: 'no such token',
  },
  INVALID_TOKEN_NAME_ERROR: {
    CODE: 11031,
    MSG: 'the length of token name must between 1 and 1024',
  },
  INVALID_TOKEN_SIMBOL_ERROR: {
    CODE: 11032,
    MSG: 'the length of symbol must between 1 and 1024',
  },
  INVALID_TOKEN_DECIMALS_ERROR: {
    CODE: 11033,
    MSG: 'decimals must between 0 and 8',
  },
  INVALID_TOKEN_TOTALSUPPLY_ERROR: {
    CODE: 11034,
    MSG: 'totalSupply must between 1 and max(int64)',
  },
  INVALID_TOKENOWNER_ERRPR: {
    CODE: 11035,
    MSG: 'invalid token owner',
  },
  INVALID_CONTRACTADDRESS_ERROR: {
    CODE: 11037,
    MSG: 'invalid contract address',
  },
  CONTRACTADDRESS_NOT_CONTRACTACCOUNT_ERROR: {
    CODE: 11038,
    MSG: 'contractAddress is not a contract account',
  },
  INVALID_TOKEN_AMOUNT_ERROR: {
    CODE: 11039,
    MSG: 'token amount must between 1 and max(int64)',
  },
  SOURCEADDRESS_EQUAL_CONTRACTADDRESS_ERROR: {
    CODE: 11040,
    MSG: 'sourceAddress cannot be equal to contractAddress',
  },
  INVALID_FROMADDRESS_ERROR: {
    CODE: 11041,
    MSG: 'invalid fromAddress',
  },
  FROMADDRESS_EQUAL_DESTADDRESS_ERROR: {
    CODE: 11042,
    MSG: 'fromAddress cannot be equal to destAddress',
  },
  INVALID_SPENDER_ERROR: {
    CODE: 11043,
    MSG: 'invalid spender',
  },
  INVALID_LOG_TOPIC_ERROR: {
    CODE: 11045,
    MSG: 'the length of log topic must between 1 and 128',
  },
  INVALID_LOG_DATA_ERROR: {
    CODE: 11046,
    MSG: 'the length of one of log data must between 1 and 1024',
  },
  INVALID_CONTRACT_TYPE_ERROR: {
    CODE: 11047,
    MSG: 'Invalid contract type',
  },
  INVALID_NONCE_ERROR: {
    CODE: 11048,
    MSG: 'nonce must between 1 and max(int64)',
  },
  INVALID_GASPRICE_ERROR: {
    CODE: 11049,
    MSG: 'gasPrice must between 1 and max(int64)',
  },
  INVALID_FEELIMIT_ERROR: {
    CODE: 11050,
    MSG: 'feeLimit must between 1 and max(int64)',
  },
  OPERATIONS_EMPTY_ERROR: {
    CODE: 11051,
    MSG: 'operations cannot be empty',
  },
  INVALID_CEILLEDGERSEQ_ERROR: {
    CODE: 11052,
    MSG: 'ceilLedgerSeq must be equal or bigger than 0',
  },
  OPERATIONS_ONE_ERROR: {
    CODE: 11053,
    MSG: 'one of operations error',
  },
  INVALID_SIGNATURENUMBER_ERROR: {
    CODE: 11054,
    MSG: 'signagureNumber must between 1 and max(int32)',
  },
  INVALID_HASH_ERROR: {
    CODE: 11055,
    MSG: 'invalid transaction hash',
  },
  INVALID_BLOB_ERROR: {
    CODE: 11056,
    MSG: 'invalid blob',
  },
  PRIVATEKEY_NULL_ERROR: {
    CODE: 11057,
    MSG: 'privateKeys cannot be empty',
  },
  PRIVATEKEY_ONE_ERROR: {
    CODE: 11058,
    MSG: 'one of privateKeys is invalid',
  },
  INVALID_BLOCKNUMBER_ERROR: {
    CODE: 11060,
    MSG: 'blockNumber must bigger than 0',
  },
  URL_EMPTY_ERROR: {
    CODE: 11062,
    MSG: 'url cannot be empty',
  },
  CONTRACTADDRESS_CODE_BOTH_NULL_ERROR: {
    CODE: 11063,
    MSG: 'contractAddress and code cannot be empty at the same time',
  },
  INVALID_OPTTYPE_ERROR: {
    CODE: 11064,
    MSG: 'optType must between 0 and 2',
  },
  GET_ALLOWANCE_ERROR: {
    CODE: 11065,
    MSG: '底层错误描述',
  },
  GET_TOKEN_INFO_ERROR: {
    CODE: 11066,
    MSG: '底层错误描述',
  },
  CONNECTN_BLOCKCHAIN_ERROR: {
    CODE: 19999,
    MSG: 'Connect blockchain failed',
  },
  SYSTEM_ERROR: {
    CODE: 20000,
    MSG: 'System error',
  },
};