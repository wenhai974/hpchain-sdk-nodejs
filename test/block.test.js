'use strict';

const should = require('chai').should();

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk account', function() {

  it('test getNumber', function() {
    sdk.blob.getNumber().then((result) => {
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

  it('test getTransactions', function() {
    sdk.blob.getTransactions('100').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getInfo', function() {
    sdk.blob.getInfo(100).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test getLatestInfo', function() {
    sdk.blob.getLatestInfo().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getValidators', function() {
    sdk.blob.getValidators(100).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test  getLatestValidators', function() {
    sdk.blob.getLatestValidators().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getReward', function() {
    sdk.blob.getReward(100).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getLatestReward', function() {
    sdk.blob.getLatestReward().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test getFees', function() {
    sdk.blob.getFees(100).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test getLatestFees', function() {
    sdk.blob.getLatestFees().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


});
