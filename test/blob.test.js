'use strict';

const should = require('chai').should();
const co = require('co');
const BigNumber = require('bignumber.js');

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test build blob', function() {

  it('build blob', function() {
    co(function* () {
      try {

        const sourceAddress = 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo';
        const destAddress = 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje';

        const accountInfo = yield sdk.account.getInfo(sourceAddress);

        if (accountInfo.errorCode !== 0) {
          console.log(accountInfo);
          return;
        }

        let nonce = accountInfo.result.nonce;

        nonce = new BigNumber(nonce).plus(1).toString(10);

        const initBalance = '1000';
        const metadata = 'Test Account Activate';

        const acountActivateInfo = sdk.operation.accountActivateOperation({
          sourceAddress,
          destAddress,
          initBalance,
          // metadata,
        });

        if (acountActivateInfo.errorCode !== 0) {
          console.log(acountActivateInfo);
          return;
        }

        const acountActivateOperation = acountActivateInfo.result.operation;
        // delete acountActivateOperation.type;
        const result = sdk.transaction.buildBlob({
          sourceAddress,
          gasPrice: '1234',
          feeLimit: '123',
          nonce: `${nonce}`,
          ceilLedgerSeq: '1',
          operations: [ acountActivateOperation ],
          // metadata: '',
        });

        console.log(result);

      } catch (err) {
        console.log(err.message);
      }
    }).catch(function(err) {
      console.log(err);
    });

  });

});
