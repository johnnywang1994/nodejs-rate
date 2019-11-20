const express = require('express')
const app = express.Router()
const stockAPI = require('./api/stock')
const stockPressAPI = require('./api/stock-pressure')
const rateAPI = require('./api/dollar-rate')
const moneyNewsAPI = require('./api/money-udn')
const gitbookAPI = require('./api/gitbook')


app.get('/', (req, res) => {
  res.end('Please enter API name...')
})

app.use('/stock', stockAPI)

app.use('/stock-pressure', stockPressAPI)

app.use('/rate', rateAPI)

app.use('/money-news', moneyNewsAPI)

app.use('/book', gitbookAPI)


module.exports = app