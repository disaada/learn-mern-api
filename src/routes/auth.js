const express = require('express')
const app = express()
const controller = require('../controllers/auth')

app.post('/register', controller.register)

module.exports = app