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
      buAmount: '6000',
      // metadata: 'oh my send bu',
    });
    console.log(sendBuOperation);
  });

});
