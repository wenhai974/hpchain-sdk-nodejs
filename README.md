bumo-sdk
=======

## bumo-sdk  Installation
```
npm install bumo-sdk --save
```

## bumo-sdk  Test
```
npm test
```

## bumo-sdk  Usage

```js
'use strict';

//Create BumoSDK instance
const BumoSDK = require('bumo-sdk');

const bumo = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

// Create account
bumo.account.create().then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Get account balance
bumo.account.getBalance('buQXz2qbTb3yx2cRyCz92EnaUKHrwZognnDw').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Get account information
bumo.account.getInfo('buQXz2qbTb3yx2cRyCz92EnaUKHrwZognnDw').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Check address
bumo.account.checkAddress('buQgE36mydaWh7k4UVdLy5cfBLiPDSVhUoPq').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Get transaction information
bumo.getTransaction('e27d287913dcbe5452d38a567b10f6b73a2a22a2f3c393180ab930286eb8ffd9').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Get block information
bumo.getBlock(100).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Check block status
bumo.checkBlockStatus().then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Get block number
bumo.getBlockNumber().then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

// Send Bu
const args = {
  senderPrivateKey: 'privbsMCSqvv8kJ1A3Zt9RWjDHyG3jRdGpj9Jrgfxw7tdz3jZzhqA55v',
  receiverAddress: 'buQgE36mydaWh7k4UVdLy5cfBLiPDSVhUoPq',
  amount: '10000000',
  nonce: '121',
}
 bumo.sendBu(args).then(data => {
   console.log(data);
 }).catch(err => {
   console.log(err.message);
 });

// Issue asset
const args = {
  privateKey: 'privbwAAXFXsf4z7VtzPtWFmfDM8dEGZ97fsskUaJYeoduCCMxxv8jnH',
  code: 'demo',
  amount: '10000000',
  nonce: '121',
};
bumo.asset.issueAsset(args).then(result => {
  console.log(result)
}).catch(err => {
  console.log(err.message)
});

// Send asset
const args = {
  senderPrivateKey: 'privbwAAXFXsf4z7VtzPtWFmfDM8dEGZ97fsskUaJYeoduCCMxxv8jnH',
  receiverAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
  code: 'demo',
  issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
  amount: '300000',
  nonce: '121',
};
bumo.asset.sendAsset(args).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

```

## License

[MIT](LICENSE)
