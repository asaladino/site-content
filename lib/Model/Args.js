"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileDetails = _interopRequireDefault(require("./FileDetails"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Command-line arguments being passed to the app.
 */
class Args {
  /**
   * Project directory to output the results.
   */

  /**
   * Domain being indexed.
   */

  /**
   * Should progress information be output to the console?
   */
  constructor(params) {
    this.verbose = true;
    Object.assign(this, params);
  }
  /**
   * If the mandatory options are not passed then show the menu.
   */


  shouldShowHelp() {
    return this.hasOwnProperty("help") || this.domain == null || this.output == null;
  }
  /**
   * Get the site name from the domain.
   */


  getSiteName() {
    return this.domain.replace(/[.]/g, "_");
  }
  /**
   * Get the project folder which the output + the site name. Also, it will be created if it doesn't exist.
   */


  getProjectPath() {
    let siteName = this.getSiteName();
    let projectPath = (0, _path.join)(this.output.filename, siteName);

    if (!(0, _fs.existsSync)(projectPath)) {
      (0, _fs.mkdirSync)(projectPath);
    }

    return projectPath;
  }

}

var _default = Args;
exports.default = _default;
//# sourceMappingURL=Args.js.map