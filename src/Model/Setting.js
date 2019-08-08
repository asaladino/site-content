import fs from "fs";

class Setting {
    constructor(params) {
        this.search = {
            port: 4444
        };
        this.web = {
            ssl: {
                enable: false,
                key: "",
                cert: ""
            }
        };
        Object.assign(this, params);
    }

    getHttp() {
        if (this.web.ssl.enable) {
            return "https";
        }
        return "http";
    }

    getWebParams() {
        if (this.web.ssl.enable) {
            return {
                key: fs.readFileSync(this.web.ssl.key),
                cert: fs.readFileSync(this.web.ssl.cert)
            };
        }
        return {};
    }

    isSslReady() {
        if (this.web.ssl.enable) {
            if (!fs.existsSync(this.web.ssl.key)) {
                throw `Missing key file: ${this.web.ssl.key}`;
            }
            if (!fs.existsSync(this.web.ssl.cert)) {
                throw `Missing cert file: ${this.web.ssl.cert}`;
            }
        }
    }
}

export default Setting;