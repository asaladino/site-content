// @flow
import { readFileSync } from "fs";
import Url from "../Model/Url";
import Args from "../Model/Args";
import { join } from "path";

/**
 * Retrieve all the urls for the domain.
 */
export default class UrlsRepository {
  /**
   * Passed from the command-line.
   */
  args: Args;

  /**
   * Build the url repository.
   */
  constructor(args: Args) {
    this.args = args;
  }

  /**
   * Find all urls.
   * @returns {[Url]} from the domain.
   */
  findAll(): Url[] {
    let urlsFile = join(this.args.getProjectPath(), "urls", "urls.json");
    return JSON.parse(readFileSync(urlsFile).toString()).map(
      entry => new Url(entry)
    );
  }
}
