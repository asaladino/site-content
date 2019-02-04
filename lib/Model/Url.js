"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Url found on the site.
 */
class Url {
  constructor(entry) {
    /**
     * Kind of like a id for file names and look up.
     * @type {string}
     */
    this.name = '';
    /**
     * Full url found on the site.
     * @type {string}
     */

    this.url = '';
    Object.assign(this, entry);
  }

}

var _default = Url;
exports.default = _default;
//# sourceMappingURL=Url.js.map