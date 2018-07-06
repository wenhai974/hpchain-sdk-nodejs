'use strict';

const is = require('is-type-of');
const protobuf = require("protobufjs");
const long = require('long');
const tou8 = require('buffer-to-uint8array');
const JSONbig = require('json-bigint');
const { keypair, signature } = require('bumo-encryption');
const errors = require('./errors');


const proto = exports;

proto.getTransaction = function* (transactionHash) {
  try {
    if (typeof transactionHash === 'undefined') {
      throw new Error('require transactionHash');
    }

    if (!is.string(transactionHash) || this._isEmptyString(transactionHash)) {
      throw new Error('transactionHash must be a non-empty string');
    }

    const data = yield this._request('get', 'getTransactionHistory', {
      hash: transactionHash
    });

    if (data.error_code === 0) {
      return this._responseData(data.result);
    }

    if (data.error_code === 4) {
      return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
    }

    return this._responseError(errors.FAIL);

  } catch (err) {
    throw err;
  }
};


proto.sendBu = function* ({ senderPrivateKey, receiverAddress, amount, nonce, gasPrice, feeLimit } = args) {
  try {
    if (is.undefined(senderPrivateKey) ||
        is.undefined(receiverAddress) ||
        is.undefined(amount) ||
        is.undefined(nonce)) {
      throw new Error(errors.INVALID_NUMBER_OF_ARG.msg);
    }

    if (!keypair.checkEncPrivateKey(senderPrivateKey)) {
      throw new Error(errors.INVALID_PRIVATE_KEY.msg);
    }

    if (!keypair.checkAddress(receiverAddress)) {
      throw new Error(errors.INVALID_ADDRESS.msg);
    }

    const obj = { amount, nonce, gasPrice, feeLimit };
    this._checkParams(obj);

    const publicKey = keypair.getEncPublicKey(senderPrivateKey);
    const senderAddress = keypair.getAddress(publicKey);
    const seqInfo = yield this._getBlockNumber();
    const info = JSONbig.parse(seqInfo);
    const seq = this._toBigNumber(info.data).toString();
    const defaultValue = yield this._getDefaultValue();

    if (gasPrice && long.fromValue(gasPrice).lessThan(defaultValue.gasPrice)){
      return this._responseError(errors.GAS_PRICE_LESS_THAN_DEFAULT);
    }

    const root = protobuf.Root.fromJSON(require('./protobuf/bundle.json'));
    const payCoin = root.lookupType('protocol.OperationPayCoin');
    const payCoinMsg = payCoin.create({
      destAddress: receiverAddress,
      amount: long.fromValue(amount),
    });

    const operation = root.lookupType('protocol.Operation');
    const operationMsg = operation.create({
      payCoin: payCoinMsg,
      type: operation.Type.PAY_COIN,
    });

    const tx = root.lookupType('protocol.Transaction');
    const payload = {
      sourceAddress: senderAddress,
      gasPrice: long.fromValue(gasPrice || defaultValue.gasPrice),
      feeLimit: long.fromValue(feeLimit || defaultValue.feeLimit),
      nonce: long.fromValue(nonce),
      ceilLedgerSeq: long.fromValue(seq).add(50) ,
      operations: [ operationMsg ],
    };
    const errMsg = tx.verify(payload);

    if (errMsg) {
      throw Error(errMsg);
    }

    const message = tx.create(payload);
    const bufferData = tx.encode(message).finish();
    const uint8ArrayData = tou8(bufferData);

    const blob = bufferData.toString('hex');
    const signData = signature.sign(uint8ArrayData, senderPrivateKey);

    const postData = this._postData(blob, signData, publicKey);
    return yield this._submitTransaction(postData);
  } catch (err) {
    throw err;
  }
};
