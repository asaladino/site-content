"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Args = _interopRequireDefault(require("../Model/Args.js"));

var _Setting = _interopRequireDefault(require("../Model/Setting.js"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsRepository {
  /**
   * Create the settings repository.
   * @param args {Args}
   */
  constructor(args) {
    this.args = args;
    /**
     * Path to the settings file.
     * @type {string}
     */

    this.file = _path.default.join(this.args.output.filename, 'settings', 'conductor.json');
  }
  /**
   * Get the setting from file or load defaults or load from memory.
   * @returns {Setting}
   */


  getSetting() {
    if (!this.settings) {
      this.settings = new _Setting.default(JSON.parse(_fs.default.readFileSync(this.file).toString()));
    }

    return this.settings;
  }
  /**
   * If the file does not exist, throw an exception.
   * @throws file not found exception.
   */


  doesFolderExist() {
    if (!_fs.default.existsSync(this.file)) {
      throw 'Settings file not found:' + this.file;
    }
  }

}

var _default = SettingsRepository;
exports.default = _default;
//# sourceMappingURL=SettingsRepository.js.map