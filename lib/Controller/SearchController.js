"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _SqliteCrawlStatesRepository = _interopRequireDefault(require("../Repository/SqliteCrawlStatesRepository"));

var _SettingsRepository = _interopRequireDefault(require("../Repository/SettingsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchController {
  constructor(args) {
    this.args = args;
    this.app = (0, _express.default)();
  }

  start() {
    var settingsRepository = new _SettingsRepository.default(this.args);
    settingsRepository.doesFolderExist();
    var setting = settingsRepository.getSetting();
    this.app.use((0, _cors.default)());
    this.app.get('/', (req, res) => {
      this.search(req, res);
    });
    (setting.web.ssl.enable ? _https.default : _http.default).createServer(setting.getWebParams(), this.app).listen(setting.search.port, () => {
      console.log("Starting content search webservice. Listening on port ".concat(setting.search.port, "!"));
    });
  }

  search(req, res) {
    var updateArgs = new _Args.default(this.args);
    updateArgs.domain = req.query.domain;
    var crawlStatesRepository = new _SqliteCrawlStatesRepository.default(updateArgs.getProjectPath());
    crawlStatesRepository.search({
      search: req.query.s,
      page: req.query.page,
      limit: req.query.limit
    }).then(urls => {
      res.json(urls);
    });
  }

}

exports.default = SearchController;
//# sourceMappingURL=SearchController.js.map