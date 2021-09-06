const express = require('express')
const app = express()

app.use(() => {
    console.log('hello world')
    console.log('hello worl2')
})

app.listen(4000)