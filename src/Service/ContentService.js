const OptionsRepository = require('../Repository/OptionsRepository');
const UrlsRepository = require('../Repository/UrlsRepository');
const HtmlRepository = require('../Repository/HtmlRepository');
const ContentRepository = require('../Repository/ContentRepository');

const extractor = require('unfluff');

class ContentService {

    constructor(args) {
        this.args = args;
        // Load the option.
        let optionsRepository = new OptionsRepository(this.args);
        this.option = optionsRepository.getOption();
        this.events = new Map();
    }

    start() {
        let urlsRepository = new UrlsRepository(this.option, this.args);
        let urls = urlsRepository.findAll();

        let htmlRepository = new HtmlRepository(this.args.getProjectPath());
        let contentRepository = new ContentRepository(this.args.getProjectPath());

        this.emitStart(urls);
        urls.forEach(url => {
            const html = htmlRepository.read(url);
            let data = extractor(html);
            contentRepository.save(url, data).then(() => this.emitProgress(url));
        });
        this.emitComplete();
    }

    on(event, callback) {
        this.events.set(event, callback);
        return this;
    }

    emitStart(urls) {
        this.events.forEach((callback, event) => {
            if (event === 'start') {
                callback(urls);
            }
        });
    }

    emitProgress(url) {
        this.events.forEach((callback, event) => {
            if (event === 'save') {
                callback(url);
            }
        });
    }

    emitComplete() {
        this.events.forEach((callback, event) => {
            if (event === 'complete') {
                callback();
            }
        });
    }
}

module.exports = ContentService;