import UrlsRepository from "../Repository/UrlsRepository";
import HtmlRepository from "../Repository/HtmlRepository";
import ContentRepository from "../Repository/ContentRepository";

import { existsSync } from "fs";
import { join } from "path";

import Args from "../Model/Args";
import Progress from "../Model/Progress";

import extractor from "unfluff";

/**
 * This service extracts all the content from the sites crawled html.
 */
export default class ContentService {
  /**
   * Build the content service.
   * @param args {Args} passed from the command-line.
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
    let htmlRepository = new HtmlRepository(this.args.getProjectPath());
    let contentRepository = new ContentRepository(this.args.getProjectPath());

    let urls = urlsRepository.findAll().filter(url => {
      return !existsSync(
        join(contentRepository.getProjectsContentFolder(), url.name + ".json")
      );
    });
    let progress = new Progress(null, urls.length);

    this.emitStart(progress);
    urls.forEach(url => {
      const html = htmlRepository.read(url);
      let data = extractor(html);
      contentRepository.save(url, data).then();
      progress.update(url);
      this.emitProgress(progress);
    });
    progress.update(null);
    this.emitComplete(progress);
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
   * @param progress {Progress} where we at.
   */
  emitStart(progress) {
    this.events.forEach((callback, event) => {
      if (event === "start") {
        callback(progress);
      }
    });
  }

  /**
   * Emits that progress event.
   * @param progress {Progress} where we at.
   */
  emitProgress(progress) {
    this.events.forEach((callback, event) => {
      if (event === "progress") {
        callback(progress);
      }
    });
  }

  /**
   * Emits that complete event when service has finished.
   * @param progress {Progress} where we at.
   */
  emitComplete(progress) {
    this.events.forEach((callback, event) => {
      if (event === "complete") {
        callback(progress);
      }
    });
  }
}