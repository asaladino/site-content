"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileDetails = _interopRequireDefault(require("./FileDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Available options for the site index.
 * @type {*[]}
 */
var _default = [{
  header: 'Site Content',
  content: 'Extracts content from a bunch of urls.'
}, {
  header: 'Options',
  optionList: [{
    name: 'domain',
    type: String,
    typeLabel: '[underline]{www.domain.com}',
    description: '(Required) Domain to extract contents.'
  }, {
    name: 'output',
    type: filename => new _FileDetails.default(filename),
    typeLabel: '[underline]{file}',
    description: '(Required) Folder to output the contents to.'
  }, {
    name: 'verbose',
    defaultValue: false,
    type: Boolean,
    description: 'Output information on the reporting.'
  }, {
    name: 'help',
    type: Boolean,
    description: 'Print this usage guide.'
  }]
}];
exports.default = _default;
//# sourceMappingURL=Menu.js.map