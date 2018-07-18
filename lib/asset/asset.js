'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const errors = require('../exception');


module.exports = Asset;

function Asset(options) {
  if (!(this instanceof Asset)) {
    return new Asset(options);
  }
  this.options = options;
}

const proto = Asset.prototype;

merge(proto, require('../common/util'));

proto.getInfo = function* (args) {
  try {
    const { address, code, issuer } = args;

    const schema = {
      address: {
        required: false,
        string: true,
        address: true,
      },
      code: {
        required: true,
        string: true,
      },
      issuer: {
        required: true,
        string: true,
      },
    };

    if (!this._validate(args, schema)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const data = yield this._request('get', 'getAccountAssets', {
      address,
    });

    if (data.error_code === 0 && data.result && data.result.length > 0 ) {
      let obj;
      data.result.some(item => {
        if (item.key.code === code &&
            item.key.issuer === issuer) {
          obj = item;
          return true;
        }
      });


      return this._responseData({
        assets: [obj],
      });

    } else {
      return this._responseData({
        assets: [],
      });
    }

  } catch (err) {
    throw err;
  }
};

wrap(proto);
