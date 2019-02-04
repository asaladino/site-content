import { writeFileSync, existsSync, mkdirSync } from 'fs';
import Url from '../Model/Url';
import { join } from "path";

/**
 * Save the url html to file.
 */
class ContentRepository {

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
     * Save json to a file.
     * @param url {Url}
     * @param content {*}
     * @returns {Promise}
     */
    save(url, content) {
        const file = join(this.getProjectsContentFolder(), url.name + '.json');
        return new Promise((resolve, reject) => {
            writeFileSync(file, JSON.stringify(content, null, 2), function (error) {
                reject(error);
            });
            resolve();
        });
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */
    getProjectsContentFolder() {
        let projectsPathHtml = join(this.projectFolder, 'content');
        if (!existsSync(projectsPathHtml)) {
            mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}

export default ContentRepository;