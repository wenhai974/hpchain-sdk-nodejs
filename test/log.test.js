'use strict';

const should = require('chai').should();

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk log', function() {

  it('test log.create', function() {
    const sourceAddress = '';
    const topic = 'test topic';
    const data = 'test data';
    const metadata = '';

    const result = sdk.operation.logCreateOperation({
      // sourceAddress,
      topic,
      data,
      // metadata,
    });

    console.log(result);
  });

});
