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
class ContentRepository {
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
   * Save json to a file.
   * @param url {Url}
   * @param content {*}
   */


  save(url, content) {
    const file = (0, _path.join)(this.getProjectsContentFolder(), url.name + ".json");
    return new Promise((resolve, reject) => {
      (0, _fs.writeFileSync)(file, JSON.stringify(content, null, 2), function (error) {
        reject(error);
      });
      resolve();
    });
  }
  /**
   * Creates the html folder in the project if it doesn't exist.
   */


  getProjectsContentFolder() {
    let projectsPathHtml = (0, _path.join)(this.projectFolder, "content");

    if (!(0, _fs.existsSync)(projectsPathHtml)) {
      (0, _fs.mkdirSync)(projectsPathHtml);
    }

    return projectsPathHtml;
  }

}

exports.default = ContentRepository;
//# sourceMappingURL=ContentRepository.js.map