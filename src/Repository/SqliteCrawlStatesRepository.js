// @flow
import {join} from "path";
import {Sequelize} from "sequelize";
import fs from 'fs';

const Op = Sequelize.Op;

class Url extends Sequelize.Model {
}

/**
 * Read and write the current crawl state to file.
 */
export default class SqliteCrawlStatesRepository {

    constructor(projectFolder: string) {
        const projectsPathUrls = join(projectFolder, "urls");
        const databaseFile = join(projectsPathUrls, "crawl_state.sqlite");
        if(!fs.existsSync(databaseFile)) {
            throw 'Database not found.';
        }

        const sequelize = new Sequelize(`sqlite:${databaseFile}`, {logging: false});

        Url.init({
            name: Sequelize.STRING,
            url: Sequelize.STRING,
            title: Sequelize.STRING,
            contents: Sequelize.STRING,
        }, {sequelize, modelName: 'url', tableName: 'urls', timestamps: false});
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Update a url with content and title.
     */
    update(name: string, title: string, contents: string) {
        Url.update({
            title: title,
            contents: contents,
        }, {
            where: {
                name: name
            }
        });
    }

    search(criteria: any) {
        const likes = criteria.search.split(' ').map(term => {
            return {contents: {[Op.like]: `%${term}%`}}
        });
        const page = criteria.page ? parseInt(criteria.page) : 0;
        const limit = criteria.limit ? parseInt(criteria.limit) : 10;

        return Url.findAndCountAll({
            attributes: [`name`, `url`, `title`, `contents`],
            offset: page * limit,
            limit: limit,
            where: {
                [Op.or]: likes
            }
        });
    }
}
