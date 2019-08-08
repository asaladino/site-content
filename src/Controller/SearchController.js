import express from 'express';
import cors from 'cors';
import http from "http";
import https from "https";
import Args from '../Model/Args';
import SqliteCrawlStatesRepository from '../Repository/SqliteCrawlStatesRepository';
import SettingsRepository from "../Repository/SettingsRepository";

export default class SearchController {

    constructor(args) {
        this.args = args;
        this.app = express();
    }

    start() {
        const settingsRepository = new SettingsRepository(this.args);
        settingsRepository.doesFolderExist();
        const setting = settingsRepository.getSetting();
        this.app.use(cors());
        this.app.get('/', (req, res) => {
            this.search(req, res);
        });
        (setting.web.ssl.enable ? https : http).createServer(setting.getWebParams(), this.app)
            .listen(setting.search.port, () => {
                console.log(`Starting content search webservice. Listening on port ${setting.search.port}!`);
            });
    }

    search(req, res) {
        let updateArgs = new Args(this.args);
        updateArgs.domain = req.query.domain;
        let crawlStatesRepository = new SqliteCrawlStatesRepository(updateArgs.getProjectPath());
        crawlStatesRepository.search({
            search: req.query.s,
            page: req.query.page,
            limit: req.query.limit,
        }).then(urls => {
            res.json(urls);
        });
    }
}