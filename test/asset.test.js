'use strict';

const should = require('chai').should();
const BumoSDK = require('../index');
const co = require('co');
const BigNumber = require('bignumber.js');


const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});


describe('Test asset', function() {

  it('issue asset', function() {
    const sourceAddress = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
    let issueOperationInfo = sdk.operation.assetIssueOperation({
      sourceAddress,
      code: 'leo',
      assetAmount: '20000e',
      metadata: 'oh my issue asset',
    });
    console.log(issueOperationInfo);
  });

  it('send asset', function() {
    const args = {
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      amount: '100',
      metadata: 'oh my test send asset',
    };

    let issueOperationInfo = sdk.operation.assetSendOperation(args);
    console.log(issueOperationInfo);
  });

  it('asset getInfo', function() {
    const args = {
      address: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
      code: 'BTC',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
    };

    sdk.asset.asset.getInfo(args).then(data => {
      console.log(data);
      console.log(JSON.stringify(data));
    });
  });

  it('transaction', function() {
    const privateKey = 'your private key';
    const sourceAddress = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';
    const destAddress = 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje';

    co(function* () {
      const result = yield sdk.account.getNonce(sourceAddress);

      if (result.errorCode !== 0) {
        console.log(result);
        return;
      }
      let nonce = result.result.nonce;
      nonce = new BigNumber(nonce).plus(1).toString(10);

      let operationItem = sdk.operation.assetSendOperation({
        sourceAddress,
        destAddress,
        code: 'leo',
        issuer: sourceAddress,
        amount: '100',
        metadata: 'oh my test send asset',
      });

      // evaluation fee
      const args = {
        sourceAddress,
        nonce,
        operation: operationItem,
        signtureNumber: '1',
        metadata: 'Test evaluation fee',
      };

      let feeData = yield sdk.transaction.evaluationFee(args);

      // console.log(feeData);
      // return;
      if (feeData.errorCode !== 0) {
        return;
      }
      const feeLimit = feeData.result.feeLimit;
      const gasPrice = feeData.result.gasPrice;

      // 2. build blob
      let blobInfo = sdk.transaction.buildBlob({
        sourceAddress,
        gasPrice,
        feeLimit,
        nonce,
        // ceilLedgerSeq: '',
        operations: [ operationItem ],
        metadata: 'oh my tx',
      });

      // blobInfo = JSONbig.parse(blobInfo);
      let blob = blobInfo.result;

      // 3. sign blob
      let signatureInfo = sdk.transaction.sign({
        privateKeys: [ privateKey ],
        blob,
      });
      // signatureInfo = JSONbig.parse(signatureInfo);
      let signature = signatureInfo.result;

      // 4. submit transaction
      let transactionInfo = yield sdk.transaction.submit({
        blob,
        signature: signature,
      });

      console.log(transactionInfo);

    }).catch(err => {
      console.log(err);
    });
  });

});
