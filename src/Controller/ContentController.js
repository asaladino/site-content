// @flow
import ContentService from "../Service/ContentService";

import Logger from "../Utility/Logger";
import Progress from "../Model/Progress";
import Args from "../Model/Args";

class ContentController {
  args: Args;
  logger: Logger;

  constructor(args: Args) {
    this.args = args;
    this.logger = new Logger(args);
  }

  start(callback: function = (event, progress: Progress) => {}): Promise<void> {
    return new Promise((resolve, reject) => {
      this.args.output.doesFolderExist();
      let contentService = new ContentService(this.args);
      contentService
        .on("start", (progress: Progress) => {
          callback('start', progress);
          this.logger.report(progress.toLog());
          if (this.args.verbose &&  progress.hasUrl()) {
            console.log(progress.toString());
          }
        })
        .on("progress", (progress: Progress) => {
          callback('progress', progress);
          this.logger.report(progress.toLog());
          if (this.args.verbose &&  progress.hasUrl()) {
            console.log(progress.toString());
          }
        })
        .on("complete", (progress: Progress) => {
          callback('complete', progress);
          this.logger.report(progress.toLog());
          if (this.args.verbose &&  progress.hasUrl()) {
            console.log(progress.toString());
          }
          resolve();
        });
      contentService.start();
    });
  }
}

export default ContentController;
