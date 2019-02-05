// @flow
import FileDetails from "./FileDetails";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

/**
 * Command-line arguments being passed to the app.
 */
class Args {
  /**
   * Project directory to output the results.
   */
  output: FileDetails;
  /**
   * Domain being indexed.
   */
  domain: string;
  /**
   * Should progress information be output to the console?
   */
  verbose: boolean;
  constructor(params: any) {
    this.verbose = false;
    Object.assign(this, params);
  }

  /**
   * If the mandatory options are not passed then show the menu.
   */
  shouldShowHelp(): boolean {
    return (
      this.hasOwnProperty("help") ||
      (this.domain == null || this.output == null)
    );
  }

  /**
   * Get the site name from the domain.
   */
  getSiteName(): string {
    return this.domain.replace(/[.]/g, "_");
  }

  /**
   * Get the project folder which the output + the site name. Also, it will be created if it doesn't exist.
   */
  getProjectPath(): string {
    let siteName = this.getSiteName();
    let projectPath = join(this.output.filename, siteName);
    if (!existsSync(projectPath)) {
      mkdirSync(projectPath);
    }
    return projectPath;
  }
}

export default Args;
