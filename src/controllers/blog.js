const {validationResult} = require('express-validator')

const create = (req, res) => {
    const {title, body} = req.body
    const validate = validationResult(req)

    const result = {
      message: 'Blog Created',
      data: {
        post_id: 1, title, body,
      }
    }

    if(validate.isEmpty()) {
      res.status(201).json(result)
    } else {
      const err = new Error('Invalid value')
      throw err
    }
}

module.exports = {
    create
}