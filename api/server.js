const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

const server = express();

const logger = (req, res, next) => {
    const { method, url, body } = req
    console.log(`METHOD: ${method}
        URL: ${url}
        BODY: ${body}`)
}

server.use(express.json());
server.use('/api/accounts', accountsRouter)

module.exports = server;
