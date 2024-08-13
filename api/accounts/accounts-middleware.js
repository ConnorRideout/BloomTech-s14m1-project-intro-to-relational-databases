const Accounts = require('./accounts-model')

const response = (message, status = 400) => {
    return { status, message }
}

const checkAccountPayload = (req, res, next) => {
    let { name, budget } = req.body
    if (typeof name === 'undefined' || typeof budget === 'undefined') {
        next(response("name and budget are required"))
    } else if (name.trim().length < 3 || name.trim().length > 100) {
        next(response("name of account must be between 3 and 100"))
    } else if (isNaN(parseFloat(budget))) {
        next(response("budget of account must be a number"))
    } else {
        budget = Number(budget)
        if (budget < 0 || budget > 1000000) {
            next(response("budget of account is too large or too small"))
        } else {
            req.body.budget = budget
            req.body.name = name.trim()
            next()
        }
    }
}

const checkAccountId = async (req, res, next) => {
    let { id } = req.params
    const acct = await Accounts.getById(id)
    if (acct) {
        req.account = acct
        next()
    } else {
        next(response("account not found", 404))
    }
}

const checkAccountNameUnique = async (req, res, next) => {
    const name = req.body.name.trim()
    if (await Accounts.getByAccountName(name)) {
        next(response("that name is taken"))
    } else {
        next()
    }
}

module.exports = {
    checkAccountPayload,
    checkAccountId,
    checkAccountNameUnique
}