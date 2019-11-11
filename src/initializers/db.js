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
            fs.writeFileSync(dbFilename, JSON.stringify({ sequence: 0, items: [] }));
        }
        this.dbFilename = dbFilename;
    }

    async readDb() {
        const content = await readFileAsync(this.dbFilename)
        return JSON.parse(content.toString());
    }

    async writeDb(items, sequence) {
        await writeFileAsync(this.dbFilename, JSON.stringify({ sequence, items }));
    }

    async getItems() {
        const { items } = await this.readDb();

        return items;
    }

    async getItem(id) {
        const { items } = await this.readDb();

        return items.filter(product => product.id === id)[0];
    };

    async createItem({ price, name }) {
        const { items, sequence } = await this.readDb();
        const id = sequence + 1;

        items.push({ id, name, price });
        await this.writeDb(items, id);

        return id;
    }

    async updateItem(id, props) {
        const { sequence, items: currentItems } = await this.readDb();
        const items = currentItems.map(product => product.id === id ? { id, ...props } : product);

        await this.writeDb(items, sequence);
    };

    async deleteItem(id) {
        const { itmes: currentItems, sequence } = await this.readDb();
        let items = currentItems.filter(product => product.id !== id);

        await this.writeDb(items, sequence);
    }
}

module.exports = DB;
