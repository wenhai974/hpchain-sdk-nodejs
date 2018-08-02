'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test token.ctp10Token', function() {

  it('test token.ctp10Token.checkValid()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.checkValid(address);
    data.result.isValid.should.equal(true);
    address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uA';
    data = await sdk.token.ctp10Token.checkValid(address);
    data.errorCode.should.equal(11037)
  });

});
