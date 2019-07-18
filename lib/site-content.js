#!/usr/bin/env node
"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

var _ContentController = _interopRequireDefault(require("./Controller/ContentController"));

var _SearchController = _interopRequireDefault(require("./Controller/SearchController"));

var _Menu = _interopRequireDefault(require("./Model/Menu"));

var _Args = _interopRequireDefault(require("./Model/Args"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = new _Args.default((0, _commandLineArgs.default)(_Menu.default[1]["optionList"]));

if (args.shouldShowHelp()) {
  console.log((0, _commandLineUsage.default)(_Menu.default));
} else {
  if (args.verbose) {
    console.log("\nStarting Site Content");
  }

  if (args.webSearch) {
    var searchController = new _SearchController.default(args);
    searchController.start();
  } else {
    var contentController = new _ContentController.default(args);
    contentController.start().then();
  }
}
//# sourceMappingURL=site-content.js.map