'use strict';

const should = require('chai').should();
const BumoSDK = require('../index');


const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bu operation', function() {

  it('build operation', function() {
    const sourceAddress = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const destAddress = 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq';
    const sendBuOperation = sdk.operation.buSendOperation({
      sourceAddress,
      destAddress,
      amount: '60000',
      metadata: 'oh my send bu',
    });

    const result = sdk.transaction.buildBlob({
      sourceAddress,
      gasPrice: '1234',
      feeLimit: '123',
      nonce: `123`,
      ceilLedgerSeq: '1',
      operation: sendBuOperation,
      metadata: 'oh my tx',
    });



    console.log(result);
  });

});
