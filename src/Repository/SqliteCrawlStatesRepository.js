// @flow
import {join} from "path";
import Database from "better-sqlite3";

/**
 * Read and write the current crawl state to file.
 */
export default class SqliteCrawlStatesRepository {
    databaseFile: string;
    db: Database;
    updateUrlsStmt: any;

    constructor(projectFolder: string) {
        let projectsPathUrls = join(projectFolder, "urls");
        this.databaseFile = join(projectsPathUrls, "crawl_state.sqlite");
        this.db = new Database(this.databaseFile, {});

        this.updateUrlsStmt = this.db.prepare("UPDATE urls SET title=?, contents=? WHERE name=?");
    }

    /**
     * Update a url with content and title.
     */
    update(name: string, title: string, contents: string) {
        this.updateUrlsStmt.run([title, contents, name]);
    }
}
