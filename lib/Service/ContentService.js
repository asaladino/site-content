"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UrlsRepository = _interopRequireDefault(require("../Repository/UrlsRepository"));

var _HtmlRepository = _interopRequireDefault(require("../Repository/HtmlRepository"));

var _ContentRepository = _interopRequireDefault(require("../Repository/ContentRepository"));

var _fs = require("fs");

var _path = require("path");

var _Args = _interopRequireDefault(require("../Model/Args"));

var _Progress = _interopRequireDefault(require("../Model/Progress"));

var _unfluff = _interopRequireDefault(require("unfluff"));

var _SqliteCrawlStatesRepository = _interopRequireDefault(require("../Repository/SqliteCrawlStatesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This service extracts all the content from the sites crawled html.
 */
class ContentService {
  /**
   * Build the content service.
   */
  constructor(args) {
    this.args = args;
    this.events = new Map();
  }
  /**
   * Start the content extraction.
   */


  start() {
    var urlsRepository = new _UrlsRepository.default(this.args);
    var htmlRepository = new _HtmlRepository.default(this.args.getProjectPath());
    var contentRepository = new _ContentRepository.default(this.args.getProjectPath());
    var crawlStatesRepository = new _SqliteCrawlStatesRepository.default(this.args.getProjectPath());
    var urls = urlsRepository.findAll().filter(url => {
      return !(0, _fs.existsSync)((0, _path.join)(contentRepository.getProjectsContentFolder(), url.name + ".json"));
    });
    var progress = new _Progress.default(null, urls.length);
    this.emitStart(progress);
    urls.forEach(url => {
      var html = htmlRepository.read(url);
      var data = (0, _unfluff.default)(html);
      contentRepository.save(url, data).then();
      SqliteCrawlStatesRepository.update(url.name, data.title, data.text);
      SqliteCrawlStatesRepository.update(url);
      this.emitProgress(progress);
    });
    SqliteCrawlStatesRepository.update(null);
    this.emitComplete(progress);
  }
  /**
   * Receive event information.
   * @param event {string} name of the event. (start, progress, and complete)
   * @param callback {Function} called when the event is emitted.
   * @returns {ContentService} for chaining.
   */


  on(event, callback) {
    this.events.set(event, callback);
    return this;
  }
  /**
   * Emits that start event.
   * @param progress {Progress} where we at.
   */


  emitStart(progress) {
    this.events.forEach((callback, event) => {
      if (event === "start") {
        callback(progress);
      }
    });
  }
  /**
   * Emits that progress event.
   * @param progress {Progress} where we at.
   */


  emitProgress(progress) {
    this.events.forEach((callback, event) => {
      if (event === "progress") {
        callback(progress);
      }
    });
  }
  /**
   * Emits that complete event when service has finished.
   * @param progress {Progress} where we at.
   */


  emitComplete(progress) {
    this.events.forEach((callback, event) => {
      if (event === "complete") {
        callback(progress);
      }
    });
  }

}

exports.default = ContentService;
//# sourceMappingURL=ContentService.js.map