const FileDetails = require('./FileDetails');
const path = require("path");
const fs = require("fs");

/**
 * Commandline arguments being passed to the indexer.
 */
class Args {
    constructor(params) {
        /**
         * Project directory to output the index results.
         * @type {FileDetails|null}
         */
        this.output = null;
        /**
         * Domain being indexed.
         * @type {string|*}
         */
        this.domain = null;
        /**
         * Should progress information be output to the console?
         * @type {boolean}
         */
        this.verbose = true;
        Object.assign(this, params);
    }

    /**
     * If the mandatory options are not passed then show the menu.
     * @returns {boolean} true if the mandatory options are not passed.
     */
    shouldShowHelp() {
        return this.hasOwnProperty('help') || (this.domain === null || this.output === null);
    }

    getSiteName() {
        return this.domain.replace(/[.]/g, '_');
    }

    getProjectPath() {
        let siteName = this.domain.replace(/[.]/g, '_');
        let projectPath = path.join(this.output.filename, siteName);
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
        }
        return projectPath;
    }
}

module.exports = Args;