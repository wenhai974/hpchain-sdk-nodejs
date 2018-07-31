'use strict';

const is = require('is-type-of');
const protobuf = require('protobufjs');
const long = require('long');

/**
 * Account set priviliege
 * @param args
 * @return {payload}
 */
module.exports = function (args) {
  try {

    const { sourceAddress, metadata, masterWeight, txThreshold, } = args;

    const root = protobuf.Root.fromJSON(require('../../crypto/protobuf/bundle.json'));

    const signer = root.lookupType('protocol.Signer');
    const signerMsg = signer.create({
      address: '',
      weight: ''
    });

    const typeThreshold = root.lookupType('protocol.OperationTypeThreshold');
    const typeThresholdMsg = signer.create({
      type: '',
      threshold: ''
    });

    const setPrivilege = root.lookupType('protocol.OperationSetPrivilege');
    const opt = {
      masterWeight,
      signers: signerMsg,
      txThreshold,
      typeThresholds: typeThresholdMsg,
    };

    const setPrivilegeMsg = setPrivilege.create(opt);
    const operation = root.lookupType('protocol.Operation');

    const payload = {
      sourceAddress,
      type: operation.Type.SET_PRIVILEGE,
      setPrivilege: setPrivilegeMsg,
    };

    if (metadata) {
      payload.metadata = metadata;
    }

    const err = operation.verify(payload);

    if (err) {
      throw Error(err);
    }

    return operation.create(payload);
  } catch (err) {
    throw err;
  }
};
