const mongo = require('mongoose')
const schema = mongo.Schema

const Blog = new schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: false,
  }
}, {
  timestamps: true
})

module.exports = mongo.model('Blog', Blog)