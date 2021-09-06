const express = require('express')
const cors = require('cors')

const app = express()
const auth = require('./src/routes/auth')
const blog = require('./src/routes/blog')

app.use(express.json())
app.use(cors())

const apiVer = '/api/v1'
app.use(`${apiVer}/auth`, auth)
app.use(`${apiVer}/blog`, blog)

app.use((err, req, res, next) => {
  res.status(400).json({
    message: 'Request Error'
  })
})  

app.listen(4000)