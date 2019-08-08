"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Setting {
  constructor(params) {
    this.search = {
      port: 4444
    };
    this.web = {
      ssl: {
        enable: false,
        key: "",
        cert: ""
      }
    };
    Object.assign(this, params);
  }

  getHttp() {
    if (this.web.ssl.enable) {
      return "https";
    }

    return "http";
  }

  getWebParams() {
    if (this.web.ssl.enable) {
      return {
        key: _fs.default.readFileSync(this.web.ssl.key),
        cert: _fs.default.readFileSync(this.web.ssl.cert)
      };
    }

    return {};
  }

  isSslReady() {
    if (this.web.ssl.enable) {
      if (!_fs.default.existsSync(this.web.ssl.key)) {
        throw "Missing key file: ".concat(this.web.ssl.key);
      }

      if (!_fs.default.existsSync(this.web.ssl.cert)) {
        throw "Missing cert file: ".concat(this.web.ssl.cert);
      }
    }
  }

}

var _default = Setting;
exports.default = _default;
//# sourceMappingURL=Setting.js.map