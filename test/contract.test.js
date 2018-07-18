'use strict';

const should = require('chai').should();

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk contract', function() {


  it('test contract.create', function() {
    const result = sdk.operation.contractCreateOperation({
      initBalance: '123',
      payload: 'hello'
    });

    console.log(result);
  });


  it('test contract.getInfo', function() {
    const address = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';
    sdk.contract.getInfo(address).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test contract.checkValid', function() {
    const address = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';
    sdk.contract.checkValid(address).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

});
