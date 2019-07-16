"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _Url = _interopRequireDefault(require("../Model/Url"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Save the url html to file.
 */
class HtmlRepository {
  /**
   * Location to the html folder in the project.
   */

  /**
   * Build a json url repository.
   */
  constructor(projectFolder) {
    this.projectFolder = projectFolder;
  }
  /**
   * Reads html for the url.
   */


  read(url) {
    var file = (0, _path.join)(this.getProjectsHtmlFolder(), url.name + ".html");
    return (0, _fs.readFileSync)(file).toString();
  }
  /**
   * Creates the html folder in the project if it doesn't exist.
   * @returns {string} for the html folder.
   */


  getProjectsHtmlFolder() {
    var projectsPathHtml = (0, _path.join)(this.projectFolder, "html");

    if (!(0, _fs.existsSync)(projectsPathHtml)) {
      (0, _fs.mkdirSync)(projectsPathHtml);
    }

    return projectsPathHtml;
  }

}

exports.default = HtmlRepository;
//# sourceMappingURL=HtmlRepository.js.map