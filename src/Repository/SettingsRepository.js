import Args from "../Model/Args.js";
import Setting from "../Model/Setting.js";

import path from "path";
import fs from "fs";

class SettingsRepository {

    /**
     * Create the settings repository.
     * @param args {Args}
     */
    constructor(args) {
        this.args = args;

        /**
         * Path to the settings file.
         * @type {string}
         */
        this.file = path.join(this.args.output.filename, 'settings', 'conductor.json');
    }

    /**
     * Get the setting from file or load defaults or load from memory.
     * @returns {Setting}
     */
    getSetting() {
        if (!this.settings) {
            this.settings = new Setting(JSON.parse(fs.readFileSync(this.file).toString()));
        }
        return this.settings;
    }

    /**
     * If the file does not exist, throw an exception.
     * @throws file not found exception.
     */
    doesFolderExist() {
        if (!fs.existsSync(this.file)) {
            throw 'Settings file not found:' + this.file;
        }
    }

}

export default SettingsRepository;