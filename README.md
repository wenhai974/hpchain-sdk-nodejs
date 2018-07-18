bumo-sdk
=======


SDK include bumo blockchain serivces.

## Goal of this module
Let global users can all use bumo blockchain services more easily.


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 6.0.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install bumo-sdk --save
```


## Quick Start

  Create bumo-sdk instance:

```js
'use strict';

const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

```

  Usage:

```js
// Get account balance

// sdk is the instance of bumo-sdk
sdk.account.getBalance('buQXz2qbTb3yx2cRyCz92EnaUKHrwZognnDw').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

```


## bumo-sdk  Test
```bash
$ npm test
```


## Example project
Bumo SDK Node.js provides rich examples for developers' reference

[Sample document entry](doc/SDK.md "")

## License

  [MIT](LICENSE)
