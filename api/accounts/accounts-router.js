const router = require('express').Router()
const Accounts = require('./accounts-model')
const {
    checkAccountPayload,
    checkAccountId, // saves `account` to req
    checkAccountNameUnique
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
    Accounts.getAll()
        .then(accts => {
            res.status(200).json(accts)
        })
        .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
    res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try {
        res.status(201).json(await Accounts.create(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
        .then(newAcct => {
            res.status(200).json(newAcct)
        })
        .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
    Accounts.deleteById(req.params.id)
        .then(() => {
            res.status(200).json(req.account)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    const { status, message } = err
    res.status(status).json({ message })
})

module.exports = router;
