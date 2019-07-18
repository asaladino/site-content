#!/usr/bin/env node
import commandLineArgs from "command-line-args";
import getUsage from "command-line-usage";
import ContentController from "./Controller/ContentController";
import SearchController from "./Controller/SearchController";
import menu from "./Model/Menu";
import Args from "./Model/Args";

let args = new Args(commandLineArgs(menu[1]["optionList"]));

if (args.shouldShowHelp()) {
    console.log(getUsage(menu));
} else {
    if (args.verbose) {
        console.log("\nStarting Site Content");
    }
    if (args.webSearch) {
        let searchController = new SearchController(args);
        searchController.start();
    } else {
        let contentController = new ContentController(args);
        contentController.start().then();
    }
}
