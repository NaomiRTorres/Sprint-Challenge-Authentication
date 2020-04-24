const db = require('../database/dbConfig.js');

module.exports = {
    insert,
    find,
    findBy,
    findById,
};

async function insert(user){
    return db('users').insert(user, 'id');
}

function find(){
    return db('users').select('id', 'username');
}

function findBy(filter){
    return db('users').where(filter);
}

function findById(id){
    return db('users')
    .where({ id })
    .first();
}
