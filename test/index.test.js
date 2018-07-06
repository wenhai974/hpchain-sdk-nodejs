'use strict';

const should = require('chai').should();
const JSONbig = require('json-bigint');

const BumoSDK = require('../');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});


describe('Test bumo-sdk', function() {

  // it('test getTransaction', function() {
  //   const hash1 = 'buQXz2qbTb3yx2cRyCz92EnaUKHrwZognnDw';
  //   // const hash2 = 'e27d287913dcbe5452d38a567b10f6b73a2a22a2f3c393180ab930286eb8ffd9';
  //   const hash2 = '393636865ee8bb44c9c8b348f4726abdbe801b37b69bb26250a98805fa59daf5';
  //   sdk.getTransaction(hash2).then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });
  //
  // it('test getBlock', function() {
  //   sdk.getBlock(100).then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });

  // it('test checkBlockStatus', function() {
  //   sdk.checkBlockStatus().then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });
  //
  // it('test getBlockNumber', function() {
  //   sdk.getBlockNumber().then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });

  // it('test account.create', function() {
  //   sdk.account.create().then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });

  // it('test account.getInfo', function() {
  //     const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
  //     // const address = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
  //     sdk.account.getInfo(address).then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // });

  // it('test account.checkAddress', function() {
  //   sdk.account.checkAddress('buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1').then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });

  // it('test account.getBalance', function() {
  //   const address1 = 'buQBigQk1L5Uwa1uQQChs4FVdsonguQvcRkM';
  //   // const address2 = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
  //   const address2 = 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i';
  //   sdk.account.getBalance(address2).then((result) => {
  //     console.log(result);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // });
  //
  // it('test sendBu', function() {
  //   const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
  //   sdk.account.getInfo(address).then(result => {
  //
  //     const obj = JSONbig.parse(result);
  //
  //     if (obj.error_code !== 0) {
  //       console.log(result);
  //       return;
  //     }
  //     const nonce = obj.data.nonce;
  //
  //     const args = {
  //       senderPrivateKey: 'privbwAAXFXsf4z7VtzPtWFmfDM8dEGZ97fsskUaJYeoduCCMxxv8jnH',
  //       receiverAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
  //       amount: '60000',
  //       nonce: nonce + '',
  //       // gasPrice: '1000',
  //       // feeLimit: '1',
  //     };
  //     sdk.sendBu(args).then(result => {
  //       console.log(result)
  //     }).catch(err => {
  //       console.log(err.message)
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  //
  // });



  // it('test asset.issueAsset', function() {
  //   const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
  //   sdk.account.getInfo(address).then(result => {
  //     const data = JSON.parse(result);
  //     const nonce = data.data.nonce;
  //
  //     const args = {
  //       privateKey: 'privbwAAXFXsf4z7VtzPtWFmfDM8dEGZ97fsskUaJYeoduCCMxxv8jnH',
  //       // code: 'leo',
  //       code: 'leo',
  //       amount: '10000000',
  //       nonce: nonce + '',
  //       gasPrice: '1000',
  //       // feeLimit: '1000000',
  //     };
  //     sdk.asset.issueAsset(args).then(result => {
  //       console.log(result)
  //     }).catch(err => {
  //       console.log(err.message)
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  // });

//

// it('test asset.sendAsset', function() {
//   const address = 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1';
//   sdk.account.getInfo(address).then(result => {
//     const data = JSON.parse(result);
//     const nonce = data.data.nonce;
//
//     const args = {
//       senderPrivateKey: 'privbwAAXFXsf4z7VtzPtWFmfDM8dEGZ97fsskUaJYeoduCCMxxv8jnH',
//       receiverAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
//       code: 'leo',
//       issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
//       amount: '300000',
//       // input: '123',
//       nonce: nonce + '',
//       gasPrice: '1000',
//       // feeLimit: '10',
//     };
//     sdk.asset.sendAsset(args).then(result => {
//       console.log(result);
//     }).catch(err => {
//       console.log(err.message);
//     });
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
// });

});
