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
      return this._responseError(rrors.INVALID_CONTRACTADDRESS_ERROR);
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

wrap(proto);
