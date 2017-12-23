const FileDetails = require('./FileDetails');
const path = require("path");
const fs = require("fs");

class Args {
    constructor(params) {
        /**
         * @type FileDetails
         */
        this.output = null;
        /**
         * @type {string}
         */
        this.domain = null;
        Object.assign(this, params);
    }

    shouldShowHelp() {
        return this.hasOwnProperty('help') || !this.domain || !this.output;
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