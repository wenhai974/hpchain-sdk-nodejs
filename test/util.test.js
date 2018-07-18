'use strict';

const should = require('chai').should();
const BumoSDK = require('../index');


const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test util', function() {

  it('build utfToHex', function() {
    const hexString = sdk.util.utfToHex('hello, world');
    console.log(hexString);
  });

  it('build hexToUtf', function() {
    const utfString = sdk.util.hexToUtf('68656c6c6f2c20776f726c64');
    console.log(utfString);
  });

  it('build buToMo', function() {
    const mo = sdk.util.buToMo('5');
    console.log(mo);
  });

  it('build moToBu', function() {
    const bu = sdk.util.moToBu('500000000');
    console.log(bu);
  });


});
