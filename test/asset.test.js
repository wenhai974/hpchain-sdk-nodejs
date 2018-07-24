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
      assetAmount: '20000',
      // metadata: 'oh my issue asset',
    });
    console.log(issueOperationInfo);
  });

  it('send asset', function() {
    const args = {
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      // metadata: 'oh my test send asset',
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

    // const args ={
    //   address : 'buQavuuHbqQz1Uc7kpY9zWLGup9GuoBLd5g8',
    //   code :'kkk',
    //   issuer : 'buQavuuHbqQz1Uc7kpY9zWLGup9GuoBLd5g8',
    // };

    sdk.asset.asset.getInfo(args).then(data => {
      console.log(data);
      console.log(JSON.stringify(data));
    });
  });

});
