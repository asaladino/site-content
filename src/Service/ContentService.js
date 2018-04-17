const UrlsRepository = require('../Repository/UrlsRepository');
const HtmlRepository = require('../Repository/HtmlRepository');
const ContentRepository = require('../Repository/ContentRepository');

const Args = require('../Model/Args');

const extractor = require('unfluff');

/**
 * This service extracts all the content from the sites crawled html.
 */
class ContentService {
    /**
     * Build the content service.
     * @param args {Args} passed from the commandline.
     */
    constructor(args) {
        this.args = args;
        this.events = new Map();
    }

    /**
     * Start the content extraction.
     */
    start() {
        let urlsRepository = new UrlsRepository(this.args);
        let urls = urlsRepository.findAll();

        let htmlRepository = new HtmlRepository(this.args.getProjectPath());
        let contentRepository = new ContentRepository(this.args.getProjectPath());

        this.emitStart(urls);
        urls.forEach(url => {
            const html = htmlRepository.read(url);
            let data = extractor(html);
            contentRepository.save(url, data).then(() => {
            });
            this.emitProgress(this.shortenUrl(url.url));
        });
        this.emitComplete();
    }


    shortenUrl(url) {
        if(url.length > 20) {
            return '...' + url.substring(url.length - 20, url.length);
        }
        return url;
    }

    /**
     * Receive event information.
     * @param event {string} name of the event. (start, progress, and complete)
     * @param callback {Function} called when the event is emitted.
     * @returns {ContentService} for chaining.
     */
    on(event, callback) {
        this.events.set(event, callback);
        return this;
    }

    /**
     * Emits that start event.
     * @param urls {[Url]} found at start.
     */
    emitStart(urls) {
        this.events.forEach((callback, event) => {
            if (event === 'start') {
                callback(urls);
            }
        });
    }

    /**
     * Emits that progress event.
     * @param url {string} that is currently having its content extracted from.
     */
    emitProgress(url) {
        this.events.forEach((callback, event) => {
            if (event === 'progress') {
                callback(url);
            }
        });
    }

    /**
     * Emits that complete event when service has finished.
     */
    emitComplete() {
        this.events.forEach((callback, event) => {
            if (event === 'complete') {
                callback();
            }
        });
    }
}

module.exports = ContentService;