const ContentService = require('../Service/ContentService');

class ContentController {
    constructor(args) {
        this.args = args;
        this.logger = new (require('../Utility/Logger'))(args);
    }

    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            let contentService = new ContentService(this.args);
            contentService.on('start', progress => {
                this.logger.report(progress.toLog());
                if (this.args.verbose) {
                    console.log(progress.toString());
                }
            }).on('progress', progress => {
                this.logger.report(progress.toLog());
                if (this.args.verbose) {
                    console.log(progress.toString());
                }
            }).on('complete', (progress) => {
                this.logger.report(progress.toLog());
                console.log(progress.toString());
                resolve();
            });
            contentService.start();
        });
    }
}

module.exports = ContentController;