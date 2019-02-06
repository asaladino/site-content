// @flow
import { writeFileSync, existsSync, mkdirSync } from "fs";
import Url from "../Model/Url";
import { join } from "path";

/**
 * Save the url html to file.
 */
export default class ContentRepository {
  /**
   * Location to the html folder in the project.
   */
  projectFolder: string;

  /**
   * Build a json url repository.
   */
  constructor(projectFolder: string) {
    this.projectFolder = projectFolder;
  }

  /**
   * Save json to a file.
   * @param url {Url}
   * @param content {*}
   */
  save(url: Url, content: any): Promise<void> {
    const file = join(this.getProjectsContentFolder(), url.name + ".json");
    return new Promise<void>((resolve, reject) => {
      writeFileSync(file, JSON.stringify(content, null, 2), function(error) {
        reject(error);
      });
      resolve();
    });
  }

  /**
   * Creates the html folder in the project if it doesn't exist.
   */
  getProjectsContentFolder(): string {
    let projectsPathHtml = join(this.projectFolder, "content");
    if (!existsSync(projectsPathHtml)) {
      mkdirSync(projectsPathHtml);
    }
    return projectsPathHtml;
  }
}
