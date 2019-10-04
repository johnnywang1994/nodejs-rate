const fs = require('fs')
const express = require('express')
const app = express.Router()
const { resolve } = require('./module')



app.get('/', (req, res) => {
  res.end('Please enter page you what to go')
})

app.get('/stock', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  fs.readFile(resolve('../views/stock.html'), 'utf-8', (err, data) => {
    res.end(data);
  })
})

app.get('/rate', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  fs.readFile(resolve('../views/dollar-rate.html'), 'utf-8', (err, data) => {
    res.end(data);
  })
})

app.get('/money-news', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  fs.readFile(resolve('../views/money-news.html'), 'utf-8', (err, data) => {
    res.end(data);
  })
})


module.exports = app