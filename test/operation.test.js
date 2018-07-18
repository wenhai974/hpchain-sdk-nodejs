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
    const sendBuInfo = sdk.operation.buSendOperation({
      sourceAddress,
      destAddress,
      buAmount: '60000',
      // metadata: 'oh my send bu',
    });

    if (sendBuInfo.errorCode !== 0) {
      console.log(sendBuInfo);
      return;
    }
    const sendBuOperation = sendBuInfo.result.operation;

    const result = sdk.transaction.buildBlob({
      sourceAddress,
      gasPrice: '1234',
      feeLimit: '123',
      nonce: `123`,
      ceilLedgerSeq: '1',
      operations: [ sendBuOperation ],
      // metadata: 'oh my tx',
    });



    console.log(result);
  });

});
