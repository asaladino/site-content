import express from 'express';
import cors from 'cors';
import Args from '../Model/Args';
import SqliteCrawlStatesRepository from '../Repository/SqliteCrawlStatesRepository';

export default class SearchController {

    constructor(args) {
        this.args = args;
        this.app = express();
    }

    start() {
        this.app.use(cors());
        this.app.get('/', (req, res) => {
            this.search(req, res);
        });
        this.app.listen(this.args.webSearchPort, () => {
            console.log(`Starting content search webservice. Listening on port ${this.args.webSearchPort}!`);
        })
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