const db = require('../database/dbConfig');

module.exports = {
    get,
    getBy,
    getById,
    add
}

function get() {
    return db('users').select('id', 'username');
}

function getBy(filter) {
    return db('users').where(filter).first()
}

function getById(id) {
    return db('users').where({ id }).first();
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return getById(id);
}