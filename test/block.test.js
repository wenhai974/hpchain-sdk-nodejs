'use strict';

const should = require('chai').should();

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk account', function() {

  it('test getNumber', function() {
    sdk.block.getNumber().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  it('test checkBlockStatus', function() {
    sdk.block.checkStatus().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err.message);
    });
  });
  //

  it('test getTransactions', function() {
    sdk.block.getTransactions('100').then(result => {
      console.log(result);
      console.log(JSON.stringify(result));
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getInfo', function() {
    sdk.block.getInfo('100').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test getLatestInfo', function() {
    sdk.block.getLatestInfo().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getValidators', function() {
    sdk.block.getValidators('100').then(result => {
      console.log(result);
      console.log(JSON.stringify(result));
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test  getLatestValidators', function() {
    sdk.block.getLatestValidators().then(result => {
      console.log(result);
      console.log(JSON.stringify(result))
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getReward', function() {
    sdk.block.getReward('100').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getLatestReward', function() {
    sdk.block.getLatestReward().then(result => {
      console.log(result);
      console.log(JSON.stringify(result))
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test getFees', function() {
    sdk.block.getFees('100').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getLatestFees', function() {
    sdk.block.getLatestFees().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


});
