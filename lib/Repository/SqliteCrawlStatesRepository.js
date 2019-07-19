"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _sequelize = require("sequelize");

var Op = _sequelize.Sequelize.Op;

class Url extends _sequelize.Sequelize.Model {}
/**
 * Read and write the current crawl state to file.
 */


class SqliteCrawlStatesRepository {
  constructor(projectFolder) {
    var projectsPathUrls = (0, _path.join)(projectFolder, "urls");
    var databaseFile = (0, _path.join)(projectsPathUrls, "crawl_state.sqlite");
    var sequelize = new _sequelize.Sequelize("sqlite:".concat(databaseFile), {
      logging: false
    });
    Url.init({
      name: _sequelize.Sequelize.STRING,
      url: _sequelize.Sequelize.STRING,
      title: _sequelize.Sequelize.STRING,
      contents: _sequelize.Sequelize.STRING
    }, {
      sequelize,
      modelName: 'url',
      tableName: 'urls',
      timestamps: false
    });
  } // noinspection JSMethodCanBeStatic

  /**
   * Update a url with content and title.
   */


  update(name, title, contents) {
    Url.update({
      title: title,
      contents: contents
    }, {
      where: {
        name: name
      }
    });
  }

  search(criteria) {
    var likes = criteria.search.split(' ').map(term => {
      return {
        contents: {
          [Op.like]: "%".concat(term, "%")
        }
      };
    });
    var page = criteria.page ? parseInt(criteria.page) : 0;
    var limit = criteria.limit ? parseInt(criteria.limit) : 10;
    return Url.findAndCountAll({
      attributes: ["name", "url", "title", "contents"],
      offset: page * limit,
      limit: limit,
      where: {
        [Op.or]: likes
      }
    });
  }

}

exports.default = SqliteCrawlStatesRepository;
//# sourceMappingURL=SqliteCrawlStatesRepository.js.map