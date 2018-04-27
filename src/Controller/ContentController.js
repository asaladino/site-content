const ContentService = require('../Service/ContentService');
const ProgressUtility = require('../Utility/ProgressUtility');

class ContentController {
    constructor(args) {
        this.args = args;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            let bar;
            let contentService = new ContentService(this.args);
            contentService.on('start', urls => {
                if (this.args.verbose) {
                    bar = ProgressUtility.build(urls.length);
                }
            }).on('progress', message => {
                if (this.args.verbose) {
                    bar.tick(1, {message: 'saved: ' + message});
                }
            }).on('complete', () => {
                console.log('Done');
                resolve();
            });
            contentService.start();
        });
    }
}

module.exports = ContentController;