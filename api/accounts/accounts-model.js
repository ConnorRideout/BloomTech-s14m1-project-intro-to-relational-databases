const db = require('../../data/db-config')

const getAll = ({ limit, sortby, sortdir }) => {
    // resolves to an array of accounts (or an empty array)
    const query = db('accounts')
    if (sortby) {
        query.orderBy(sortby, sortdir ? sortdir : 'asc')
    }
    if (limit) {
        query.limit(limit)
    }
    return query
}

const getById = id => {
    // resolves to an account by the given id
    return db('accounts')
        .where({ id })
        .first()
}

const create = account => {
    // resolves to the newly created account
    return db('accounts')
        .insert(account)
        .then(([id]) => {
            return getById(id)
        })
}

const updateById = (id, account) => {
    // resolves to the updated account
    return db('accounts')
        .where({ id })
        .update(account)
        .then(() => {
            return getById(id)
        })
}

const deleteById = id => {
    // resolves to the deleted account
    return db('accounts')
        .where({ id })
        .del()
}

const getByAccountName = name => {
    return db('accounts')
        .where({ name })
        .first()
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getByAccountName,
}
