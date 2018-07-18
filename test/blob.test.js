'use strict';

const should = require('chai').should();
const co = require('co');

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

        nonce = nonce + 1;

        // 1.build operation
        // let sendBuOperation = sdk.operation.buSendOperation({
        //   destAddress,
        //   amount: '60000',
        //   metadata: 'oh my send bu',
        // });


        // const result = sdk.transaction.buildBlob({
        //   sourceAddress,
        //   gasPrice: '1234',
        //   feeLimit: '123',
        //   nonce: `${nonce}`,
        //   ceilLedgerSeq: '1',
        //   operation: sendBuOperation,
        //   metadata: 'oh my tx',
        // });

        // const sourceAddress = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
        // const destAddress = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
        const initBalance = '1000';
        const metadata = 'Test Account Activate';

        const acountActivateOperation = sdk.operation.accountActivateOperation({
          sourceAddress,
          destAddress,
          initBalance,
          metadata,
        });

        // delete acountActivateOperation.type;
        const result = sdk.transaction.buildBlob({
          sourceAddress,
          gasPrice: '1234',
          feeLimit: '123',
          nonce: `${nonce}`,
          ceilLedgerSeq: '1',
          operations: [ acountActivateOperation ],
          metadata: 'oh my tx',
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
