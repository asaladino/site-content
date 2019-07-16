"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _betterSqlite = _interopRequireDefault(require("better-sqlite3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Read and write the current crawl state to file.
 */
class SqliteCrawlStatesRepository {
  constructor(projectFolder) {
    var projectsPathUrls = (0, _path.join)(projectFolder, "urls");
    this.databaseFile = (0, _path.join)(projectsPathUrls, "crawl_state.sqlite");
    this.db = new _betterSqlite.default(this.databaseFile, {});
    this.updateUrlsStmt = this.db.prepare("UPDATE urls SET title=?, contents=? WHERE name=?");
  }
  /**
   * Update a url with content and title.
   */


  update(name, title, contents) {
    this.updateUrlsStmt.run([title, contents, name]);
  }

}

exports.default = SqliteCrawlStatesRepository;
//# sourceMappingURL=SqliteCrawlStatesRepository.js.map