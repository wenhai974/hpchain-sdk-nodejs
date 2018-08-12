'use strict';

require('chai').should();
const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('The demo of atp10Token', function() {

  it('Build atp10Token Issue Operation', async() => {
    const atp10TokenMetadata = {
      atp: '1.0',
      code: 'demo-code',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      totalSupply: '1000000000000',
      decimals: '8',
      description: ''
    };

    const atp10TokenIssueOperation = sdk.operation.assetIssueOperation({
      sourceAddress: atp10TokenMetadata.issuer,
      code: atp10TokenMetadata.code,
      assetAmount: '20000',
      metadata: atp10TokenMetadata,
    });

  });

  it('Build atp10Token Send Operation', async() => {
    const atp10TokenMetadata = {
      atp: '1.0',
      code: 'demo-code',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      totalSupply: '1000000000000',
      decimals: '8',
      description: ''
    };

    const atp10TokenSendOperation = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: atp10TokenMetadata,
    });

  });

});
