const express = require('express')
const app = express.Router()
const axios = require('axios')
const { changeCount } = require('../module')


// eg. http://localhost:8080/api/stock/?no=2882,2887
app.get('/', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  let query = req.query;
  
  if (!query.no) return res.end('Please enter stock number to search...');

  let noList = [];

  query.no.split(',').forEach(no => {
    return noList.push(`tse_${no}.tw`)
  })

  let handleData = function(data) {
    let stockInfo = data['msgArray']
    let datetime = {
      'date': data['queryTime']['sysDate'],
      'time': data['queryTime']['sysTime']
    }
    let result = {
      'status': data['rtmessage'],
      'data': [],
      datetime
    }

    stockInfo.forEach(stock => {
      result['data'].push({
        'name': stock['n'] + stock['c'],
        'now-price': stock['z'],
        'unit': stock['tv'],
        'total': stock['v'],
        'open-price': stock['o'],
        'high-price': stock['h'],
        'low-price': stock['l'],
        'yesterday-price': stock['y'],
        'percent': changeCount(stock['z'], stock['y'])
      })
    })

    return result;
  }
  
  axios.get(`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${noList.join('|')}&json=1`)
    .then(response => res.end(JSON.stringify(handleData(response.data))))

})



module.exports = app