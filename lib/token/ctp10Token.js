'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const { keypair } = require('bumo-encryption');

const errors = require('../exception');


module.exports = Ctp10Token;

function Ctp10Token(options) {
  if (!(this instanceof Ctp10Token)) {
    return new Ctp10Token(options);
  }
  this.options = options;
}

const proto = Ctp10Token.prototype;

merge(proto, require('../common/util'));

proto.checkValid = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    let data = yield this._request('get', 'getAccount', {
      address: contractAddress,
    });


    if (data.error_code !== 0) {
      return this._responseData({
        isValid: false,
      });
    }

    data = data.result;
    const contract = data.contract.metadatas;
    const metadatas = data.metadatas;
    let key = '';
    let value = '';
    if (metadatas && is.array(metadatas)) {

      metadatas.some(item => {
        if (item.key === 'global_attribute') {
          key = 'global_attribute';
          value = item.value;
          return true;
        }
      });

      if (key !== 'global_attribute') {
        return this._responseData({
          isValid: false,
        });
      }

      const info = JSON.parse(value);

      if ('1.0' !== info.ctp) {
        return this._responseData({
          isValid: false,
        });
      }

      if (!info.symbol || info.symbol < 0 || info.symbol > 8) {
        return this._responseData({
          isValid: false,
        });
      }

      const schema = {
        balance: {
          required: true,
          numeric: true,
        },
        name: {
          required: true,
          string: true,
        },
        symbol: {
          required: true,
          string: true,
        },
        totalSupply: {
          required: true,
          numeric: true,
        },
        contractOwner: {
          required: true,
          address: true,
        },
      };

      if (!this._validate(info, schema).tag) {
        return this._responseData({
          isValid: false,
        });
      }

      return this._responseData({
        isValid: true,
      });

    } else {
      return this._responseData({
        isValid: false,
      });
    }

  } catch (err) {
    throw err;
  }
};


proto.getInfo = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.checkValid(contractAddress);

    if (!data.result.isValid) {
      return this._responseData('');
    }

    let info = yield this._request('get', 'getAccount', {
      address: contractAddress,
    });

    const metadatas = info.result.metadatas;
    let token = '';

    metadatas.some(item => {
      if (item.key === 'global_attribute') {
        token = item.value;
        return true;
      }
    });

    const tokenInfo = JSON.parse(token);
    console.log(tokenInfo);
    return this._responseData({
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      totalSupply: tokenInfo.totalSupply,
      decimals: tokenInfo.decimals,
    });
  } catch (err) {
    throw err;
  }
};


proto.getName = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.getInfo(contractAddress);

    if (data.result === '') {
      return this._responseData('');
    }

    return this._responseData({
      name: data.result.name,
      // symbol: tokenInfo.symbol,
      // totalSupply: tokenInfo.totalSupply,
      // decimals: tokenInfo.decimals,
    });
  } catch (err) {
    throw err;
  }
};




proto.getSymbol = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.getInfo(contractAddress);

    if (data.result === '') {
      return this._responseData('');
    }

    return this._responseData({
      symbol: data.result.symbol,
    });
  } catch (err) {
    throw err;
  }
};


proto.getDecimals = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.getInfo(contractAddress);

    if (data.result === '') {
      return this._responseData('');
    }

    return this._responseData({
      decimals: data.result.decimals,
    });
  } catch (err) {
    throw err;
  }
};

proto.getTotalSupply = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.getInfo(contractAddress);

    if (data.result === '') {
      return this._responseData('');
    }

    return this._responseData({
      totalSupply: data.result.totalSupply,
    });
  } catch (err) {
    throw err;
  }
};


proto.getBalance = function* (contractAddress) {
  try {
    if (!keypair.checkAddress(contractAddress)) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const isContractAddress = yield this._isContractAddress(contractAddress);
    if (!isContractAddress) {
      return this._responseError(errors.INVALID_CONTRACTADDRESS_ERROR);
    }

    const data = yield this.checkValid(contractAddress);

    if (!data.result.isValid) {
      return this._responseData('');
    }

    let info = yield this._request('get', 'getAccount', {
      address: contractAddress,
    });

    const metadatas = info.result.metadatas;
    let token = '';

    metadatas.some(item => {
      if (item.key === 'global_attribute') {
        token = item.value;
        return true;
      }
    });

    const tokenInfo = JSON.parse(token);

    return this._responseData({
      balance: tokenInfo.balance,
    });
  } catch (err) {
    throw err;
  }
};


wrap(proto);
