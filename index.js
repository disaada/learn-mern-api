const express = require('express')
const cors = require('cors')
const mongo = require('mongoose')
const multer = require('multer')
const path = require('path')

const app = express()
const auth = require('./src/routes/auth')
const blog = require('./src/routes/blog')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else cb(null, false)
}

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter}).single('image'))

const apiVer = '/api/v1'
app.use(`${apiVer}/auth`, auth)
app.use(`${apiVer}/blog`, blog)

app.use((err, req, res, next) => {
  const { status, message, data } = err
  status && res.status(status).json({ message, data })
})

mongo.connect('mongodb+srv://disaada:NgQBVY4cAx6bYdFX@cluster0.vyine.mongodb.net/learn-mern?retryWrites=true&w=majority')
.then(() => {
  app.listen(4000, () => console.log('Connection Success'))
})
.catch(err => err)