"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContentService = _interopRequireDefault(require("../Service/ContentService"));

var _Logger = _interopRequireDefault(require("../Utility/Logger"));

var _Progress = _interopRequireDefault(require("../Model/Progress"));

var _Args = _interopRequireDefault(require("../Model/Args"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContentController {
  constructor(args) {
    this.args = args;
    this.logger = new _Logger.default(args);
  }

  start() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (event, progress) => {};
    return new Promise((resolve, reject) => {
      this.args.output.doesFolderExist();
      var contentService = new _ContentService.default(this.args);
      contentService.on("start", progress => {
        callback('start', progress);
        this.logger.report(progress.toLog());

        if (this.args.verbose && progress.hasUrl()) {
          console.log(progress.toString());
        }
      }).on("progress", progress => {
        callback('progress', progress);
        this.logger.report(progress.toLog());

        if (this.args.verbose && progress.hasUrl()) {
          console.log(progress.toString());
        }
      }).on("complete", progress => {
        callback('complete', progress);
        this.logger.report(progress.toLog());

        if (this.args.verbose && progress.hasUrl()) {
          console.log(progress.toString());
        }

        resolve();
      });
      contentService.start();
    });
  }

}

var _default = ContentController;
exports.default = _default;
//# sourceMappingURL=ContentController.js.map