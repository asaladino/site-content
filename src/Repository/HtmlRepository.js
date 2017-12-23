const fs = require('fs');
const Url = require('../Model/Url');
const path = require("path");

/**
 * Save the url html to file.
 */
class HtmlRepository {

    /**
     * Build a json url repo.
     * @param projectFolder {string}
     */
    constructor(projectFolder) {
        /**
         * Location to the html folder in the project.
         * @type {string}
         */
        this.projectFolder = projectFolder;
    }

    /**
     * Reads html for the rul.
     * @param url {Url}
     * @returns {string}
     */
    read(url) {
        const file = path.join(this.getProjectsHtmlFolder(), url.name + '.html');
        return fs.readFileSync(file).toString();
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */
    getProjectsHtmlFolder() {
        let projectsPathHtml = path.join(this.projectFolder, 'html');
        if (!fs.existsSync(projectsPathHtml)) {
            fs.mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}

module.exports = HtmlRepository;