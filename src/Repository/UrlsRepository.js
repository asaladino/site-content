const fs = require('fs');
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const Option = require('../Model/Option');
const path = require("path");

class UrlsRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        this.option = option;
        this.args = args;
    }

    /**
     * Find urls for range specified in the Pa11yLogin
     * @returns {[Url]}
     */
    findForRange() {
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(fs.readFileSync(urlsFile).toString())
            .map(entry => new Url(entry));
    }
}

module.exports = UrlsRepository;