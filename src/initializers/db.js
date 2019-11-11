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
            fs.writeFileSync(dbFilename, JSON.stringify({ sequence: 0, data: [] }));
        }
        this.dbFilename = dbFilename;
    }

    async getItems() {
        const { data } = await this.readDb();

        return data;
    }

    async readDb() {
        const content = await readFileAsync(this.dbFilename)
        return JSON.parse(content.toString());
    }

    async createItem({ price, name }) {
        const { sequence, data } = await this.readDb();
        const id = sequence + 1;

        data.push({ id, name, price });

        await writeFileAsync(this.dbFilename, JSON.stringify({ sequence: id, data }));

        return id;
    }

    async deleteItem(id) {
        const { sequence, data } = await this.readDb();

        let newData = data.filter(product => product.id !== id);
        await writeFileAsync(this.dbFilename, JSON.stringify({ sequence, data: newData }));
    }
}

module.exports = DB;
