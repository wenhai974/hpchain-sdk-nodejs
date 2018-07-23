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
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    // const address = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
    sdk.account.getInfo(address).then(result => {
      console.log(result);
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
    const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';

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



  // it('transaction', function() {
  //   const privateKey = 'your private key';
  //   const sourceAddress = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';
  //
  //   co(function* () {
  //     const result = yield sdk.account.getNonce(sourceAddress);
  //
  //     if (result.errorCode !== 0) {
  //       console.log(result);
  //       return;
  //     }
  //     let nonce = result.result.nonce;
  //     nonce = new BigNumber(nonce).plus(1).toString(10);
  //
  //     const account = yield sdk.account.create();
  //
  //     if (account.errorCode !== 0) {
  //       console.log(account);
  //       return;
  //     }
  //
  //     const destAddress = account.result.address;
  //
  //     let operationItem = sdk.operation.accountActivateOperation({
  //       sourceAddress,
  //       destAddress,
  //       initBalance: '10000000',
  //       metadata: 'Account activate demo',
  //     });
  //
  //     // evaluation fee
  //     const args = {
  //       sourceAddress,
  //       nonce,
  //       operation: operationItem,
  //       signtureNumber: '1',
  //       // metadata: 'Test evaluation fee',
  //     };
  //
  //     let feeData = yield sdk.transaction.evaluatFee(args);
  //
  //     if (feeData.errorCode !== 0) {
  //       console.log(feeData);
  //       return;
  //     }
  //     const feeLimit = feeData.result.feeLimit;
  //     const gasPrice = feeData.result.gasPrice;
  //
  //     // 2. build blob
  //     let blobInfo = sdk.transaction.buildBlob({
  //       sourceAddress,
  //       gasPrice,
  //       feeLimit,
  //       nonce,
  //       // ceilLedgerSeq: '',
  //       operations: [ operationItem ],
  //       metadata: 'oh my tx',
  //     });
  //
  //     // blobInfo = JSONbig.parse(blobInfo);
  //     let blob = blobInfo.result;
  //
  //     // 3. sign blob
  //     let signatureInfo = sdk.transaction.sign({
  //       privateKeys: [ privateKey ],
  //       blob,
  //     });
  //     // signatureInfo = JSONbig.parse(signatureInfo);
  //     let signature = signatureInfo.result;
  //
  //     // 4. submit transaction
  //     let transactionInfo = yield sdk.transaction.submit({
  //       blob,
  //       signature: signature,
  //     });
  //
  //     console.log(transactionInfo);
  //
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // });

});
