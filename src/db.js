let items = [
    {
        id: 1,
        name: 'Cola',
        price: 100,
    },
    {
        id: 2,
        name: 'Water',
        price: 150,
    }
];

function writeItem(data) {
    const id = items[items.length -1].id + 1;
    items.push({id, ...data});
}

function getItems() {
    return items;
}

function getItem(itemId) {
    return items.filter(item => item.id === itemId)[0];
}

function deleteItem(itemId) {
    items = items.filter(item => item.id != itemId);
}

function updateItem (itemId, data) {
    items = items.map(item => item.id === itemId ? {id: itemId, ...data} : item);
}

module.exports = {
    writeItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
};
