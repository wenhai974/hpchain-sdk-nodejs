'use strict';

require('chai').should();
const encryption = require('bumo-encryption');
const BumoSDK = require('bumo-sdk');
// const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('The demo of atp10Token', function() {

  // Issue Unlimited Atp10Token
  it('IssueUnlimitedAtp10Token', async() => {
    const issuerPrivateKey = 'issuer private key';
    // The token name
    const name = 'MYTESTTOKEN';
    // The token code
    const code = 'MYTESTTOKEN';
    // The apt token icon
    const icon = '';
    // The apt token version
    const version = '1.0';
    // The token total supply number
    const totalSupply = 0;
    // The token now supply number
    const nowSupply = '1000000000';
    // The token decimals
    const decimals = 0;
    // Description
    const description = 'test unlimited issuance of apt1.0 token';
    // The operation notes
    const metadata = 'test the unlimited issuance of apt1.0 token';
    // the unit is MO
    const gasPrice = '1000';
    // feeLimit, the unit is MO
    const feeLimit = '5003000000';
    // Transaction initiation account's Nonce + 1
    const nonce = '87';

    // Get the account address
    const issuerAddress = getAddressByPrivateKey(issuerPrivateKey);


    // Build operation
    const assetIssueOperation = sdk.operation.assetIssueOperation({
      sourceAddress: issuerAddress,
      code,
      assetAmount: nowSupply,
      metadata,
    });

    if (assetIssueOperation.errorCode !== 0) {
      console.log(assetIssueOperation);
      return assetIssueOperation;
    }

    const apt10Obj = {
      name,
      code,
      description,
      decimals,
      totalSupply,
      icon,
    };
    const key = `asset_property_${code}`;
    const value = JSON.stringify(apt10Obj);
    const accountSetMetadataOperation = sdk.operation.accountSetMetadataOperation({
      key,
      value,
      version,
    });

    if (accountSetMetadataOperation.errorCode !== 0) {
      console.log(accountSetMetadataOperation);
      return accountSetMetadataOperation;
    }

    let args = {
      privateKey: issuerPrivateKey,
      sourceAddress: issuerAddress,
      gasPrice,
      feeLimit,
      nonce,
      operation: [ assetIssueOperation, accountSetMetadataOperation ],
      metadata,
    };
    const result = await submitTransaction(args);
    console.log(result);
  });

  // Issue limited Atp10Token
  it('IssuelimitedAtp10Token', async() => {
    const issuerPrivateKey = 'issuer private key';
    // The token name
    const name = 'MYTESTTOKEN';
    // The token code
    const code = 'MYTESTTOKEN';
    // The apt token icon
    const icon = '';
    // The apt token version
    const version = '1.0';
    // The token total supply number
    const totalSupply = 1000000000;
    // The token now supply number
    const nowSupply = '1000000000';
    // The token decimals
    const decimals = 0;
    // Description
    const description = 'test limited issuance of apt1.0 token';
    // The operation notes
    const metadata = 'test limited issuance of apt1.0 token';
    // the unit is MO
    const gasPrice = '1000';
    // feeLimit, the unit is MO
    const feeLimit = '5003000000';
    // Transaction initiation account's Nonce + 1
    const nonce = '88';

    // Get the account address
    const issuerAddress = getAddressByPrivateKey(issuerPrivateKey);


    // Build operation
    const assetIssueOperation = sdk.operation.assetIssueOperation({
      sourceAddress: issuerAddress,
      code,
      assetAmount: nowSupply,
      metadata,
    });

    if (assetIssueOperation.errorCode !== 0) {
      console.log(assetIssueOperation);
      return assetIssueOperation;
    }

    const apt10Obj = {
      name,
      code,
      description,
      decimals,
      totalSupply,
      icon,
    };
    const key = `asset_property_${code}`;
    const value = JSON.stringify(apt10Obj);
    const accountSetMetadataOperation = sdk.operation.accountSetMetadataOperation({
      key,
      value,
      version,
    });

    if (accountSetMetadataOperation.errorCode !== 0) {
      console.log(accountSetMetadataOperation);
      return accountSetMetadataOperation;
    }

    let args = {
      privateKey: issuerPrivateKey,
      sourceAddress: issuerAddress,
      gasPrice,
      feeLimit,
      nonce,
      operation: [ assetIssueOperation, accountSetMetadataOperation ],
      metadata,
    };
    const result = await submitTransaction(args);
    console.log(result);
  });


  it('SendAtp10Token', async() => {
    // The account private key to send atp1.0 token
    const senderPrivateKey = 'Sender Private Key';
    // The account to receive atp 1.0 token
    const destAddress = 'buQc77ZYKT2dYZ5pzdsfGdGjGMJGGR9ZVZ1p';
    // The token code
    const code = 'MYTESTTOKEN';
    // The token amount to be sent
    const amount = '1000000000';
    // The operation notes
    const metadata = 'test one off issue apt1.0 token';
    // the unit is MO
    const gasPrice = '1000';
    // maximum cost, the unit is MO
    const feeLimit = '1000000';
    // Transaction initiation account's Nonce + 1
    const nonce = '100';

    // Get the account address
    const senderAddress = getAddressByPrivateKey(senderPrivateKey);
    // Check whether the destination account is activated
    let status = await checkAccountStatus(destAddress);

    if  (!status) {
      let accountInfo = await accountActivate({
        privateKey: senderPrivateKey,
        sourceAddress: senderAddress,
        destAddress: destAddress,
        nonce: '22',
      });
    }

    const operation = sdk.operation.assetSendOperation({
      sourceAddress: senderAddress,
      destAddress: destAddress,
      code: code,
      issuer: senderAddress,
      assetAmount: amount,
      metadata: metadata,
    });

    if (operation.errorCode === 0) {
      let args = {
        privateKey: senderPrivateKey,
        sourceAddress: senderAddress,
        gasPrice,
        feeLimit,
        nonce,
        operation,
      };
      const result = await submitTransaction(args);
      console.log(result);
    }

  });

  // Check account status
  async function checkAccountStatus(address) {
    const data = await sdk.account.isActivated(address);
    return data.result.isActivated;
  }

  // Activate account
  async function accountActivate(args) {
    let operation = sdk.operation.accountActivateOperation({
      destAddress: args.destAddress,
      initBalance: '1000000',
    });

    const result = await submitTransaction({
      privateKey: args.privateKey,
      sourceAddress: args.sourceAddress,
      gasPrice: '1000',
      feeLimit: '1000000',
      nonce: args.nonce,
      operation,
    });

    return result.errorCode === 0;
  }

  // Get address from private key
  function getAddressByPrivateKey(privatekey) {
    const KeyPair = encryption.keypair;
    let publicKey = KeyPair.getEncPublicKey(privatekey);
    return KeyPair.getAddress(publicKey);
  }

  // Submit
  async function submitTransaction(args) {
    let operations = [];

    if (Array.isArray(args.operation)) {
      args.operation.forEach(function(item) {
        operations.push(item.result.operation);
      })
    } else {
      operations.push(args.operation.result.operation);
    }

    // // 1. Build Operation
    // const operationItem = args.operation.result.operation;

    let opt = {
      sourceAddress: args.sourceAddress,
      gasPrice: args.gasPrice,
      feeLimit: args.feeLimit,
      nonce: args.nonce,
      operations,
    };

    if (args.metadata) {
      opt.metadata = JSON.stringify(args.metadata);
    }

    // 2. Build blob
    let blobInfo = sdk.transaction.buildBlob(opt);

    if (blobInfo.errorCode !== 0) {
      console.log(blobInfo);
      return;
    }

    let blob = blobInfo.result.transactionBlob;

    // 3. Sign blob
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ args.privateKey ],
      blob,
    });

    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }

    let signature = signatureInfo.result.signatures;
    // 4. Submit transaction
    return await sdk.transaction.submit({
      blob,
      signature: signature,
    });
  }

});
