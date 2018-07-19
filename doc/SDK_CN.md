[English](doc/SDK_EN.md) | 中文

# Bumo SDK

## 概述
本文档简要概述bumo-sdk-nodejs常用接口文档, 让开发者更方便地写入和查询BU区块链。

- [名词解析](#名词解析)
- [请求参数与响应数据格式](#请求参数与响应数据格式)
	- [请求参数](#请求参数)
	- [响应数据](#响应数据)
- [使用方法](#使用方法)
    - [生成SDK实例](#生成SDK实例)
    - [生成公私钥地址](#生成公私钥地址)
    - [有效性校验](#有效性校验接口)
    - [查询](#查询)
	- [提交交易](#提交交易)
		- [获取账户nonce值](#获取账户nonce值)
		- [构建操作](#构建操作)
		- [构建交易Blob](#构建交易blob)
		- [签名交易](#签名交易)
		- [广播交易](#广播交易)
- [账户服务](#账户服务)
	- [checkValid](#checkvalid)
	- [getInfo](#getinfo)
	- [getNonce](#getnonce)
	- [getBalance](#getbalance)
	- [getAssets](#getassets)
- [资产服务](#资产服务)
    - [getAsset](#getasset)
- [交易服务](#交易服务)
    - [操作说明](#操作说明)
	- [buildBlob](#buildblob)
	- [evaluationFee](#evaluationfee)
	- [sign](#sign)
	- [submit](#submit)
	- [getInfo](#getinfo)
- [区块服务](#区块服务)
    - [getNumber](#getnumber)
	- [checkStatus](#checkstatus)
	- [getTransactions](#gettransactions)
	- [getInfo](#getinfo)
	- [getLatestInfo](#getlatestinfo)
	- [getValidators](#getvalidators)
	- [getLatestValidators](#getlatestvalidators)
	- [getReward](#getreward)
	- [getLatestReward](#getlatestreward)
	- [getFees](#getfees)
	- [getLatestFees](#getlatestfees)
- [情景示例](#情景示例)
- [错误码](#错误码)

## 名词解析

操作BU区块链： 向BU区块链写入或修改数据

广播交易： 向BU区块链写入或修改数据

查询BU区块链： 查询BU区块链中的数据

账户服务： 提供账户相关的有效性校验与查询接口

资产服务： 提供资产相关的查询接口

交易服务： 提供操写入BU区块链与查询接口

区块服务： 提供区块的查询接口

账户nonce值： 每个账户都维护一个序列号，用于用户提交交易时标识交易执行顺序的



## 请求参数与响应数据格式

### 请求参数

为了保证数字精度，请求参数中的Number类型，全都按照字符串处理，例如：
amount = 500， 那么传递参数时候就将其更改为 amount = '500' 字符串形式


### 响应数据

响应数据为JavaScript对象，数据格式如下：

```js
{
	errorCode: 0,
	errorDesc: '',
	result: {}
}
```

说明：
1. errorCode: 错误码。0表示无错误，大于0表示有错误
2. errorDesc: 错误描述。
3. result: 返回结果

> 因响应数据结构固定，方便起见，后续接口说明中的`响应数据`均指`result`对象的属性


## SDK安装
```
npm install bumo-sdk --save
```

## 使用方法

这里介绍SDK的使用流程，首先需要生成SDK实现，然后调用相应服务的接口，其中服务包括账户服务、资产服务、合约服务、交易服务、区块服务，接口按使用分类分为生成公私钥地址接口、有效性校验接口、查询接口、提交交易相关接口

### 生成SDK实例
##### 传入参数
options 是一个对象，可以包含如下属性

   参数      |     类型     |     描述      |
----------- | ------------ | ----------------- |
host|   String   | ip地址:端口             |

##### 实例：

```js
const BumoSDK = require('bumo-sdk');

const options = {
  host: 'seed1.bumotest.io:26002',
};

const sdk = new BumoSDK(options);

```

### 信息查询
用于查询BU区块链上的数据，直接调用相应的接口即可，比如，查询账户信息，调用如下：

```js
const address = 'buQemmMwmRQY1JkcU7w3nhruo%X5N3j6C29uo';

sdk.account.getInfo(address).then(info=> {
  console.log(info);
}).catch(err => {
  console.log(err.message);
});
```

### 提交交易
提交交易的过程包括以下几步：获取账户nonce值，构建操作，构建交易Blob，签名交易和广播交易。

#### 获取账户nonce值

开发者可自己维护各个账户nonce，在提交完一个交易后，自动递增1，这样可以在短时间内发送多笔交易，否则，必须等上一个交易执行完成后，账户的nonce值才会加1。接口调用如下：

```js

const address = 'buQemmMwmRQY1JkcU7w3nhruo%X5N3j6C29uo';

sdk.account.getNonce(address).then(info => {

  if (info.errorCode !== 0) {
    console.log(info);
    return;
  }

  const nonce = new BigNumber(info.result.nonce).plus(1).toString(10);
});

// 该例子中使用了big-number.js 将nonce的值加1，并返回字符串类型

```

#### 构建操作

这里的操作是指在交易中做的一些动作。 例如：构建发送BU的操作，调用如下:

```js
const destAddress = 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje';

const info = sdk.operation.buSendOperation({
	destAddress,
	amount: '60000',
	metadata: '746573742073656e64206275',
});

```

#### 构建交易Blob

该接口用于生成交易Blob字符串，接口调用如下：
> 注意：nonce、gasPrice、feeLimit其值是只能是包含数字的字符串且不能以0开头
>

```js

  let blobInfo = sdk.transaction.buildBlob({
    sourceAddress: 'buQnc3AGCo6ycWJCce516MDbPHKjK7ywwkuo',
    gasPrice: '3000',
    feeLimit: '1000',
    nonce: '102',
    operations: [ sendBuOperation ],
    metadata: '74657374206275696c6420626c6f62',
  });

  const blob = blobInfo.result;

```

#### 签名交易

该接口用于交易发起者使用私钥对交易进行签名。接口调用如下：

```js
  const signatureInfo = sdk.transaction.sign({
    privateKeys: [ privateKey ],
    blob,
  });

  const signature = signatureInfo.result;
```

#### 广播交易

该接口用于向BU区块链发送交易，触发交易的执行。接口调用如下：

```js
  sdk.transaction.submit({
    blob,
    signature: signature,
  }).then(data => {
  	console.log(data);
  });

```

## 账户服务

账户服务主要是账户相关的接口，包括5个接口：checkValid, getInfo, getNonce, getBalance, getAssets, getMetadata。

### checkValid
> 接口说明

   该接口用于检测账户地址的有效性

> 调用方法

sdk.account.checkValid(address)

> 请求参数

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String     |  待检测的账户地址   

> 响应数据

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
isValid     |   Boolean     |  账户地址是否有效   

> 错误码

   异常       |     错误码   |   描述   
-----------  | ----------- | --------
SYSTEM_ERROR |   20000     |  System error

> 示例

```js
const address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uo';

sdk.account.checkValid(address).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

```

### getInfo

> 接口说明

   该接口用于获取账户信息

> 调用方法

sdk.account.getInfo(address);

> 请求参数

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String     |  待检测的账户地址  

> 响应数据

   参数    |     类型      |        描述       
--------- | ------------- | ----------------
address	|	String		|		账户地址       
balance	|	String		|		账户余额       
nonce	  	|	String		|		账户交易序列号
assets		|	Array		|		账户资产
priv		|	Object		|		账户权限

> priv object

   参数       |     类型     |        描述       
-----------  | ------------ | ----------------
masterWeight	|	String    |	账户自身权重
thresholds	|	Object		|	门限

> thresholds object

   参数       |     类型     |        描述       
-----------  | ------------ | ----------------
tx_threshold	 |    String	    |   交易默认门限


> 错误码

   异常       |     错误码   |   描述   
-----------  | ----------- | --------
INVALID_ADDRESS_ERROR| 11006 | Invalid address
CONNECTNETWORK_ERROR| 11007| Connect network failed
SYSTEM_ERROR |   20000     |  System error

> 示例

```js
const address = 'buQemmMwmRQY1JkcU7w3nhruo%X5N3j6C29uo';

sdk.account.getInfo(address).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});
```

### getNonce

> 接口说明

   该接口用于获取账户的nonce

> 调用方法

sdk.account.getNonce(address);

> 请求参数

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String     |  待检测的账户地址   

> 响应数据

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
nonce       |   String    |  该账户的交易序列号   

> 错误码

   异常       |     错误码   |   描述   
-----------  | ----------- | --------
INVALID_ADDRESS_ERROR	|	11006	| Invalid address
CONNECTNETWORK_ERROR	|	11007	| Connect network failed
SYSTEM_ERROR				|	20000	|  System error

> 示例

```js

const address = 'buQswSaKDACkrFsnP1wcVsLAUzXQsemauEjf';

sdk.account.getNonce(address).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

```

### getBalance

> 接口说明

   该接口用于查询账户BU的余额

> 调用方法

sdk.account.getBalance(address);

> 请求参数

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String     |  待检测的账户地址   

> 响应数据

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
balance     |   String    |  该账户的]余额   

> 错误码

   异常       |     错误码   |   描述   
-----------  | ----------- | --------
INVALID_ADDRESS_ERROR| 11006 | Invalid address
CONNECTNETWORK_ERROR| 11007| Connect network failed
SYSTEM_ERROR |   20000     |  System error

> 示例

```js

const address = 'buQswSaKDACkrFsnP1wcVsLAUzXQsemauEjf';

const info = sdk.getAccountService().getBalance(address);

```

### getAssets

> 接口说明

   该接口用于获取账户所有资产信息

> 调用方法

sdk.account.getAssets(address);

> 请求参数

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String     |  待检测的账户地址   

> 响应数据

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
assets		|	Array	|	账户资产

> assets 数组元素为Object，其中包含如下属性:

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
amount		|	String	|	账户资产数量
key			|	object |  包含属性: code资产编码、issuer资产发行账户地址


## 资产服务

账户服务主要是资产相关的接口，目前有1个接口：getAsset

### getAsset

> 接口说明

   该接口用于获取账户指定资产信息

> 调用方法

sdk.asset.asset.getInfo(args);

> 请求参数args为Object其中包含如下属性

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
address     |   String    |  必填，待查询的账户地址
code        |   String    |  必填，资产编码，长度[1 1024]
issuer      |   String    |  必填，资产发行账户地址

> 响应数据

   参数      	|     类型     	|        描述       
----------- 	| ------------ 	| ----------------
asset			|  Array			|	账户资产   

> assets 数组元素为Object，其中包含如下属性:

   参数      |     类型     |        描述       
----------- | ------------ | ----------------
amount		|	String	|	账户资产数量
key			|	object |  包含属性: code资产编码、issuer资产发行账户地址

> 错误码

   异常       					|     错误码   |   描述   |
----------------------			| ----------- | -------- |
INVALID_ADDRESS_ERROR			|	11006	| Invalid address
CONNECTNETWORK_ERROR			|	11007	| Connect network failed
INVALID_ASSET_CODE_ERROR		|	11023	| The length of asset code must between 1 and 1024
INVALID_ISSUER_ADDRESS_ERROR	|	11027	| Invalid issuer address
SYSTEM_ERROR						|	20000	| System error

> 示例

```js

const args = {
	address: 'buQnnUEBREw2hB6pWHGPzwanX7d28xk6KVcp',
	code: 'TST',
	issuer: 'buQnnUEBREw2hB6pWHGPzwanX7d28xk6KVcp',
};


sdk.asset.asset.getInfo(args).then(data => {
  console.log(data);
});


```


## 交易服务

交易服务主要是交易相关的接口，目前有5个接口：buildBlob, evaluationFee, sign, submit, getInfo。

其中调用buildBlob之前需要构建一些操作，分别包括如下操作:

### 操作说明

##### 激活账户

>  调用方式: sdk.operation.accountActivateOperation(args)
>
>	参数说明: args为Object，其中包含如下属性


   成员变量    |     类型  |        描述                           |
------------- | -------- | ----------------------------------   |
sourceAddress |   String |  选填，操作源账户                       |
metadata      |   String |  选填，备注，必须是16进制字符串           |
destAddress   |   String |  必填，目标账户地址                     |
initBalance   |   String |  必填，初始化资产，其值只能是包含数字的字符串且不能以0开头, 值范围[1, max(int64)] (单位是MO) |
> 1 BU = 10^8 MO

> 返回值

成员变量		|     类型  |        描述                           |
---------	| -------- | ----------------------------------   |
operation |   Object  |  激活账户操作对象                       |

##### 发送BU
>  调用方式: sdk.operation.buSendOperation(args)
>
>	参数说明: args为Object，其中包含如下属性


   成员变量    |     类型  |        描述                           |
------------- | -------- | ----------------------------------   |
sourceAddress		|   String |  选填，操作源账户                       |
metadata			|   String |  选填，备注，必须是16进制字符串           |
destAddress		|   String |  必填，目标账户地址                     |
buAmount			|   String |  必填，初始化资产，其值只能是包含数字的字符串且不能以0开头, 值范围[1, max(int64)] (单位是MO)|

> 返回值

成员变量		|     类型  |        描述                           |
---------	| -------- | ----------------------------------   |
operation |   Object  |  发送BU操作对象                       |


##### 发布资产
>  调用方式: sdk.operation.assetIssueOperation(args)
>
>	参数说明: args为Object，其中包含如下属性


   成员变量    |     类型  |        描述                           |
------------- | -------- | ----------------------------------   |
sourceAddress		|   String |  选填，操作源账户                       |
metadata			|   String |  选填，备注，必须是16进制字符串           |
code				|   String |  必填，资产编码                     |
assetAmount		|   String |  必填，资产发布数量，其值只能是包含数字的字符串且不能以0开头, 值范围[1, max(int64)] (单位是MO) |

> 返回值

成员变量		|     类型  |        描述                           |
---------	| -------- | ----------------------------------   |
operation |   Object  |  发布资产操作对象                       |


##### 转移资产
>  调用方式: sdk.operation.assetSendOperation(args)
>
>	参数说明: args为Object，其中包含如下属性


   成员变量    |     类型  |        描述                           |
------------- | -------- | ----------------------------------   |
sourceAddress		|   String |  选填，操作源账户                       |
metadata			|   String |  选填，备注，必须是16进制字符串           |
destAddress		|   String |  必填，目标账户地址                     |
code				|   String |  必填，资产编码                     |
issuer				|   String |  必填，资产发行账户地址              |
assetAmount		|   String |  必填，资产转移数量，其值只能是包含数字的字符串且不能以0开头, 值范围[1, max(int64)] (单位是MO) |

> 返回值

成员变量		|     类型  |        描述                           |
---------	| -------- | ----------------------------------   |
operation |   Object  |  转移资产操作对象                       |


### buildBlob

> 接口说明

   该接口用于生成交易Blob字符串

> 调用方法

sdk.transaction.buildBlob(args)

> 请求参数args为Object, 其中包含如下属性:


   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
sourceAddress		|   String     |  必填，操作源账户    |
gasPrice			|   String     |  必填，打包费用 (单位是MO)  |
feeLimit			|   String     |  必填，交易费用 (单位是MO) |
nonce				|   String     |  必填，交易序列号 |
operations		|   Array		  |  必填，操作   |
ceilLedgerSeq		|   String     |  选填，区块高度限制  |
metadata			|   String     |  选填，备注，必须是16进制字符串   |

>  gasPrice、feeLimit、nonce、ceilLedgerSeq其值只能是包含数字的字符串且不能以0开头
> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
transactionBlob |   String     |  Transaction序列化后的16进制字符串   

> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
INVALID_SOURCEADDRESS_ERROR | 11002 | Invalid sourceAddress
INVALID_NONCE_ERROR					| 11048 | Nonce must between 1 and max(int64)
INVALID_GASPRICE_ERROR			| 11049	| Amount must between gasPrice in block and max(int64)
INVALID_FEELIMIT_ERROR			| 11050	|	FeeLimit must between 1000000 and max(int64)
SYSTEM_ERROR 								|   20000     |  系统错误
> 示例

```js
const args = {
  sourceAddress,
  gasPrice,
  feeLimit,
  nonce,
  operations: [ sendBuOperation ],
  metadata: '6f68206d79207478',
};
const blobInfo = sdk.transaction.buildBlob(args);

```

### evaluationFee

> 接口说明

   该接口实现交易的费用评估

> 调用方法

sdk.transaction.evaluationFee(args)

> 请求参数args为Object, 包含如下属性

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
sourceAddress		|   String     |  必填，发起该操作的源账户地址   |
nonce				|   String     |  必填，待发起的交易序列号   |
operation			|   String     |  必填，待提交的操作列表  |
signtureNumber	|   String     |  选填，待签名者的数量，默认是1  |
metadata			|   String     |  选填，备注，必须为16进制字符串   |

> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
gasPrice    |   String     |  打包费用  |
feeLimit    |   String     |  交易费用  |

> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js
const args = {
	sourceAddress: 'buQswSaKDACkrFsnP1wcVsLAUzXQsemauEjf',
	nonce: '101',
	operation: sendBuOperation,
	signtureNumber: '1',
	metadata: '54657374206576616c756174696f6e20666565',
};

sdk.transaction.evaluationFee(args).then(data => {
  console.log(data);
});


```

###  sign

> 接口说明

   该接口实现交易的签名

> 调用方法

sdk.transaction.sign(args)

> 请求参数args为Object, 包含如下属性

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
privateKeys		|   Array     |  必填，私钥列表   |
blob				|   String     |  必填，待签名blob   |


> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
signatures    |   Array     |  签名后的数据列表  |

> signatures元素为object, 其中包含如下属性

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
signData    |   String     |  签名后的数据列表  |
publicKey    |   String     | 公钥 |


> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js
const signatureInfo = sdk.transaction.sign({
	privateKeys: [ privateKey ],
	blob,
});

console.log(signatureInfo);

```

###  submit

> 接口说明

   该接口实现交易的提交

> 调用方法

sdk.transaction.submit(args)

> 请求参数args为Object, 包含如下属性

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
	blob				|   String     |  必填，交易blob  |
  signature		|   Array     |  必填，签名列表   |


> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
hash    |   String     |  交易hash |



> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js
  let transactionInfo = yield sdk.transaction.submit({
    blob: blob,
    signature: signature,
  });

```
## 区块服务

### getNumber

> 接口说明

  查询最新的区块高度

> 调用方法

sdk.blob.getNumber()


> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
header    |   Object    |  区块头   |
blockNumber    |   String    |  最新的区块高度  |

> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js
sdk.blob.getNumber().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});

```

### checkStatus

> 接口说明

  检查本地节点区块是否同步完成

> 调用方法

sdk.blob.checkStatus()


> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
isSynchronous     |   boolean     |  区块是否同步   |

> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js

sdk.blob.checkStatus().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});

```


### getInfo

> 接口说明

  检查本地节点区块是否同步完成

> 调用方法

sdk.blob.getInfo()

> 请求参数

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
isSynchronous     |   boolean     |  区块是否同步   |

> 响应数据

   参数      |     类型     |        描述       |
----------- | ------------ | ---------------- |
isSynchronous     |   boolean     |  区块是否同步   |

> 错误码

   异常       |     错误码   |   描述   |
-----------  | ----------- | -------- |
SYSTEM_ERROR |   20000     |  系统错误 |

> 示例

```js

sdk.blob.checkStatus().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});

```


## 错误码
