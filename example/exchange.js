'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('The demo of bumo-sdk for exchange ', function() {

  it('Create account', async() => {
    const keypair = await sdk.account.create();
    console.log(keypair);
  });

  it('Get account information', async() => {
    const address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uo';
    const info = await sdk.account.getInfo(address);
    console.log(info);
  });

  it('Check address validity', async() => {
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const data = await sdk.account.checkValid(address);
    console.log(data);
  });

  it('Get account balance', async() => {
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const data = await sdk.account.getBalance(address);
    console.log(data);
  });

  it('Get account nonce', async() => {
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    const data = await sdk.account.getNonce(address);
    console.log(data);
  });

  it('Get the latest block number', async() => {
    const data = await sdk.block.getNumber();
    console.log(data);
  });

  it('Check local node block synchronization status', async() => {
    const data = await sdk.block.checkStatus();
    console.log(data);
  });

  it('Get transactions for a blockNumber', async() => {
    const blockNumber = '100';
    const data = await sdk.block.getTransactions(blockNumber);
    console.log(data);
  });

  it('Get block information', async() => {
    const data = await sdk.block.getInfo('100');
    console.log(data);
  });

  it('Get the latest block information', async() => {
    const data = await sdk.block.getLatestInfo();
    console.log(data);
  });

  it('Get the validators in the specified blockNumber', async() => {
    const data = await sdk.block.getValidators('100');
    console.log(data);
  });

  it('Get the latest validators', async() => {
    const data = await sdk.block.getLatestValidators();
    console.log(data);
  });

  it('Get block rewards and validator rewards in the specified blockNumber', async() => {
    const data = await sdk.block.getReward('100');
    console.log(data);
  });

  it('Get block rewards and validator rewards in the latest blockNumber', async() => {
    const data = await sdk.block.getLatestReward();
    console.log(data);
  });


  it('Get fees in the specified blockNumber', async() => {
    const data = await sdk.block.getFees('100');
    console.log(data);
  });

  it('Get fees in the latest blockNumber', async() => {
    const data = await sdk.block.getLatestFees();
    console.log(data);
  });
  
});
