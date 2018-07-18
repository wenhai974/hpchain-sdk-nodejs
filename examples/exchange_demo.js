'use strict';

const co = require('co');
const BigNumber = require('bignumber.js');
// const BumoSDK = require('bumo-sdk');
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});


// Create account
sdk.account.create().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';

// Get account info
sdk.account.getInfo(address).then(result => {
  console.log(result);
  console.log(JSON.stringify(result));
}).catch(err => {
  console.log(err.message);
});

// Check address
sdk.account.checkValid('buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1').then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

// Get account balance
sdk.account.getBalance(address).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

// Get nonce
sdk.account.getNonce(address).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

// Get account's assets
sdk.account.getAssets(address).then(result => {
  console.log(result);
  console.log(JSON.stringify(result));
}).catch(err => {
  console.log(err.message);
});

// Activate account
const privateKey = 'your private key';
const sourceAddress = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';

co(function* () {
  const result = yield sdk.account.getNonce(sourceAddress);

  if (result.errorCode !== 0) {
    console.log(result);
    return;
  }
  let nonce = result.result.nonce;
  // nonce + 1
  nonce = new BigNumber(nonce).plus(1).toString(10);

  const account = yield sdk.account.create();

  if (account.errorCode !== 0) {
    console.log(account);
    return;
  }

  const destAddress = account.result.address;

  let operationInfo = sdk.operation.accountActivateOperation({
    sourceAddress,
    destAddress,
    initBalance: '10000000',
    // metadata: '6f68206d79207478',
  });

  if (operationInfo.errorCode !== 0) {
    return;
  }
  const operationItem = operationInfo.result.operation;

  // 2. build blob
  let blobInfo = sdk.transaction.buildBlob({
    sourceAddress,
    gasPrice: '1000',
    feeLimit: '306000',
    nonce,
    // ceilLedgerSeq: '',
    operations: [ operationItem ],
    // metadata: 'oh my tx',
  });

  if (blobInfo.errorCode !== 0) {
    console.log(blobInfo);
    return;
  }

  let blob = blobInfo.result.transactionBlob;

  // 3. sign blob
  let signatureInfo = sdk.transaction.sign({
    privateKeys: [ privateKey ],
    blob,
  });

  if (signatureInfo.errorCode !== 0) {
    console.log(signatureInfo);
    return;
  }

  let signature = signatureInfo.result.signatures;

  // 4. submit transaction
  let transactionInfo = yield sdk.transaction.submit({
    blob,
    signature: signature,
  });

  console.log(transactionInfo);

}).catch(err => {
  console.log(err);
});
