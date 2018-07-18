'use strict';

const should = require('chai').should();

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk account', function() {

  it('test getBlock', function() {
    sdk.blob.getBlock(100).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  it('test checkBlockStatus', function() {
    sdk.blob.checkStatus().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err.message);
    });
  });
  //
  it('test getNumber', function() {
    sdk.blob.getNumber().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err.message);
    });
  });

});
