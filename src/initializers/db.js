const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    dbFilename = ''
    constructor() {
        const dbRootDir = path.join(__dirname, '../..', 'assets');
        if (!fs.existsSync(dbRootDir)) {
            fs.mkdirSync(dbRootDir);
        }
        const dbFilename = path.join(dbRootDir, 'db.json');
        if (!fs.existsSync(dbFilename)) {
            fs.writeFileSync(dbFilename, JSON.stringify([]));
        }
        this.dbFilename = dbFilename;
    }

    async getItems() {
        // return readFileAsync(this.dbFilename).then(data => JSON.parse(data));
        const data = await readFileAsync(this.dbFilename)
        return JSON.parse(data.toString());
    }

    async createItem({ price, name }) {
        const data = await this.getItems();
        const id = (data.length ? data[data.length - 1] : { id: 0 }).id + 1;

        data.push({ id, name, price });

        await writeFileAsync(this.dbFilename, JSON.stringify(data));

        return id;
    }

    async deleteItem(id) {
        const data = await this.getItems();
        let newData = data.filter(product => product.id !== id);
        await writeFileAsync(this.dbFilename, JSON.stringify(newData));
    }
}

module.exports = DB;
