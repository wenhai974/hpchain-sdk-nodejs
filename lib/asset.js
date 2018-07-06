'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const protobuf = require("protobufjs");
const long = require('long');
const tou8 = require('buffer-to-uint8array');
const JSONbig = require('json-bigint');
const { keypair, signature } = require('bumo-encryption');
const errors = require('./errors');


module.exports = Asset;

function Asset(options) {
  if (!(this instanceof Asset)) {
    return new Asset(options);
  }
  this.options = options;
}

const proto = Asset.prototype;

merge(proto, require('./util'));

proto.issueAsset = function* ({ privateKey, code, amount, nonce, gasPrice, feeLimit } = args) {
  try {
    if (is.undefined(privateKey) ||
        is.undefined(code) ||
        is.undefined(amount) ||
        is.undefined(nonce)) {
      throw new Error(errors.INVALID_NUMBER_OF_ARG.msg);
    }

    if (!keypair.checkEncPrivateKey(privateKey)) {
      throw new Error(errors.INVALID_PRIVATE_KEY.msg);
    }

    if (!is.string(code)) {
      throw new Error(errors.INVALID_TYPE_OF_ARG.msg);
    }

    if (this._isEmptyString(code) || code.length > 64) {
      throw new Error('Invalid code');
    }

    const obj = { amount, nonce, gasPrice, feeLimit };

    this._checkParams(obj);

    // sender public key
    const publicKey = keypair.getEncPublicKey(privateKey);
    const sourceAddress = keypair.getAddress(publicKey);
    const seqInfo = yield this._getBlockNumber();
    const info = JSONbig.parse(seqInfo);
    const seq = this._toBigNumber(info.data).toString();
    const defaultValue = yield this._getDefaultValue();
    const _50bu = long.fromValue(`${50 * Math.pow(10, 5)}`).mul(defaultValue.gasPrice);

    if (gasPrice && long.fromValue(gasPrice).lessThan(defaultValue.gasPrice)){
      return this._responseError(errors.GAS_PRICE_LESS_THAN_DEFAULT);
    }

    const root = protobuf.Root.fromJSON(require('./protobuf/bundle.json'));

    const issueAsset = root.lookupType('protocol.OperationIssueAsset');
    const issueAssetMsg = issueAsset.create({
      code: code,
      amount: long.fromValue(amount),
    });

    const operation = root.lookupType('protocol.Operation');
    const operationMsg = operation.create({
      issueAsset: issueAssetMsg,
      type: operation.Type.ISSUE_ASSET,
    });

    const tx = root.lookupType('protocol.Transaction');
    const payload = {
      sourceAddress: sourceAddress,
      gasPrice: long.fromValue(gasPrice || defaultValue.gasPrice),
      feeLimit: long.fromValue(feeLimit || long.fromValue(defaultValue.feeLimit).add(_50bu)),
      nonce: long.fromValue(nonce),
      ceilLedgerSeq: long.fromValue(seq).add(50),
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
    const signData = signature.sign(uint8ArrayData, privateKey);

    const postData = this._postData(blob, signData, publicKey);
    return yield this._submitTransaction(postData);
  } catch (err) {
    throw err;
  }
};

proto.sendAsset = function* ({ senderPrivateKey, receiverAddress, code, issuer, amount, nonce, gasPrice, feeLimit } = args) {
  try {
    if (is.undefined(senderPrivateKey) ||
        is.undefined(receiverAddress) ||
        is.undefined(code) ||
        is.undefined(issuer) ||
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

    if (!is.string(code) || !is.string(issuer)) {
      throw new Error(errors.INVALID_TYPE_OF_ARG.msg);
    }

    if (this._isEmptyString(code) || code.length > 64) {
      throw new Error('Invalid code');
    }

    if (this._isEmptyString(issuer)) {
      throw new Error('Issuer cannot be empty');
    }

    const obj = { amount, nonce, gasPrice, feeLimit };

    this._checkParams(obj);

    const publicKey = keypair.getEncPublicKey(senderPrivateKey);
    const sourceAddress = keypair.getAddress(publicKey);
    const seqInfo = yield this._getBlockNumber();
    const info = JSONbig.parse(seqInfo);
    const seq = info.data;
    const defaultValue = yield this._getDefaultValue();

    if (gasPrice && long.fromValue(gasPrice).lessThan(defaultValue.gasPrice)){
      return this._responseError(errors.GAS_PRICE_LESS_THAN_DEFAULT);
    }

    const root = protobuf.Root.fromJSON(require('./protobuf/bundle.json'));

    const assetKey = root.lookupType('protocol.AssetKey');
    const assetKeyMsg = assetKey.create({
      issuer: issuer,
      code: code,
      // type: type,
    });

    const asset = root.lookupType('protocol.Asset');
    const assetMsg = asset.create({
      key: assetKeyMsg,
      amount: long.fromValue(amount),
    });

    const operationPayAsset = root.lookupType('protocol.OperationPayAsset');
    const operationPayAssetMsg = operationPayAsset.create({
      destAddress: receiverAddress,
      asset: assetMsg,
    });

    const operation = root.lookupType('protocol.Operation');
    const operationMsg = operation.create({
      payAsset: operationPayAssetMsg,
      type: operation.Type.PAY_ASSET,
    });

    const tx = root.lookupType('protocol.Transaction');
    const payload = {
      sourceAddress: sourceAddress,
      gasPrice: long.fromValue(gasPrice || defaultValue.gasPrice),
      feeLimit: long.fromValue(feeLimit || defaultValue.feeLimit),
      nonce: long.fromValue(nonce),
      ceilLedgerSeq: long.fromValue(seq).add(50),
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

wrap(proto);
