// @flow
import { readFileSync, existsSync, mkdirSync } from "fs";
import Url from "../Model/Url";
import { join } from "path";

/**
 * Save the url html to file.
 */
export default class HtmlRepository {
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
   * Reads html for the url.
   */
  read(url: Url): string {
    const file = join(this.getProjectsHtmlFolder(), url.name + ".html");
    return readFileSync(file).toString();
  }

  /**
   * Creates the html folder in the project if it doesn't exist.
   * @returns {string} for the html folder.
   */
  getProjectsHtmlFolder(): string {
    let projectsPathHtml = join(this.projectFolder, "html");
    if (!existsSync(projectsPathHtml)) {
      mkdirSync(projectsPathHtml);
    }
    return projectsPathHtml;
  }
}
