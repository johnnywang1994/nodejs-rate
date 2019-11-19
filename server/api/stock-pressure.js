const express = require('express');
const app = express.Router();


// superagent 請求套件: 爬取靜態 DOM
// cheerio 類 JQuery 套件: 模擬 JQuery 控制抓取的 DOM
const superagent = require('superagent');
const cheerio = require('cheerio');


app.get('/', function(req, res, next){
  // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  let query = req.query;
  let period = query.month === '1' ? '24' : '';

  if (!query.no) return res.end('Please enter stock number to search...');

  superagent.get(`https://www.cnyes.com/twstock/Pressure${period}/${query.no}.htm`)
    .end((err, data)=>{
      if (err) throw err;
      // data.text 為該網頁 html 內容，將它傳給 cheerio.load 之後
      // 就可以得到一个實現了 jquery 接口的變量，我们習慣性地將它命名為 `$`
      // 剩下就都是 jquery 的内容了
      let $ = cheerio.load(data.text);
      let items = [];

      $('.tabbr .cr').each((i, element)=>{
        let $element = $(element);
        if (i % 2 === 0) {
          items.push({
            price: $element.text().trim()
          });
        } else {
          items[items.length - 1].value = $element.text();
        }
      });

      var output = {
        status: 200,
        message: '台灣股市壓力支撐表',
        fetchtime: new Date(),
        no: query.no,
        data: items
      };

      res.send(output);
    });
});

module.exports = app