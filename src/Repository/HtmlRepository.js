import { readFileSync, existsSync, mkdirSync } from 'fs';
import Url from '../Model/Url';
import { join } from "path";

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
     * Reads html for the url.
     * @param url {Url}
     * @returns {string}
     */
    read(url) {
        const file = join(this.getProjectsHtmlFolder(), url.name + '.html');
        return readFileSync(file).toString();
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */
    getProjectsHtmlFolder() {
        let projectsPathHtml = join(this.projectFolder, 'html');
        if (!existsSync(projectsPathHtml)) {
            mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}

export default HtmlRepository;