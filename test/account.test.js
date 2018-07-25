'use strict';

const should = require('chai').should();
const co = require('co');
const BigNumber = require('bignumber.js');


const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk account', function() {

  it('test account.create', function() {
    sdk.account.create().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test account.getInfo', function() {
    const address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uo';
    // const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    // const address = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
    sdk.account.getInfo(address).then(result => {
      console.log(result);
      console.log(JSON.stringify(result));
    }).catch(err => {
      console.log(err.message);
    });
  });

  // check address
  it('test account.checkValid', function() {
    sdk.account.checkValid('buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1').then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    })
  });

  it('test account.getBalance', function() {
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';

    sdk.account.getBalance(address).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });

  });

  it('test account.getNonce', function() {
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';

    sdk.account.getNonce(address).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err.message);
    });
  });


  it('test account.getAssets', function() {
    // const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uo';

    sdk.account.getAssets(address).then(result => {
      console.log(result);
      console.log(JSON.stringify(result));
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('test account.activate operation', function() {
    const sourceAddress = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const destAddress = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
    const initBalance = '1000';
    const metadata = 'Test Account Activate';

    const result = sdk.operation.accountActivateOperation({
      sourceAddress,
      destAddress,
      initBalance,
      metadata,
    });

    console.log(result);
  });

});
