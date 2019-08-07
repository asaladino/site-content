"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _SqliteCrawlStatesRepository = _interopRequireDefault(require("../Repository/SqliteCrawlStatesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchController {
  constructor(args) {
    this.args = args;
    this.app = (0, _express.default)();
  }

  start() {
    this.app.use((0, _cors.default)());
    this.app.get('/', (req, res) => {
      this.search(req, res);
    });
    this.app.listen(this.args.webSearchPort, () => {
      console.log("Starting content search webservice. Listening on port ".concat(this.args.webSearchPort, "!"));
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