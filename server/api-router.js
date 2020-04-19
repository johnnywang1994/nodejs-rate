const express = require('express')
const app = express.Router()
const stockAPI = require('./api/stock')
const rateAPI = require('./api/dollar-rate')
const moneyNewsAPI = require('./api/money-udn')


app.get('/', (req, res) => {
  res.end('Please enter API name...')
})

app.use('/stock', stockAPI)

app.use('/rate', rateAPI)

app.use('/money-news', moneyNewsAPI)


module.exports = app