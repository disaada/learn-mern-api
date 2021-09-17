const mongo = require('mongoose')
const schema = mongo.Schema

const Blog = new schema({
  title: String,
  body: String,
  image: String,
  // author: Object
}, {
  timestamps: true
})

module.exports = mongo.model('Blog', Blog)