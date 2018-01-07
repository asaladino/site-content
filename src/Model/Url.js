class Url {
    constructor(entry) {
        this.name = '';
        this.url = '';
        Object.assign(this, entry);
    }
}

module.exports = Url;