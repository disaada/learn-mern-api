const express = require('express')
const {body} = require('express-validator')

const app = express()
const controller = require('../controllers/blog')

app.post('/', [
  body('title').isLength({min: 5}).withMessage('Judul min 5 huruf'), 
  body('body').isLength({min: 5})
], controller.create)

app.get('/', controller.getAll)

app.get('/:id', controller.getById)

app.put('/:id', controller.edit)

app.delete('/:id', controller.drop)

module.exports = app