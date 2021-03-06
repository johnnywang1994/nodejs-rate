const express = require('express');
const app = express.Router();


// superagent 請求套件: 爬取靜態 DOM
// cheerio 類 JQuery 套件: 模擬 JQuery 控制抓取的 DOM
const superagent = require('superagent');
const cheerio = require('cheerio');


app.get('/', function(req, res, next){
  superagent.get('https://rate.bot.com.tw/xrt?Lang=zh-TW')
    .end((err, data)=>{
      if (err) throw err;
      // data.text 為該網頁 html 內容，將它傳給 cheerio.load 之後
      // 就可以得到一个實現了 jquery 接口的變量，我们習慣性地將它命名為 `$`
      // 剩下就都是 jquery 的内容了
      let $ = cheerio.load(data.text);
      let items = [];
      $('table[title="牌告匯率"] > tbody').children('tr').each((i, element)=>{
        let $element = $(element);
        items.push({
          title: $element.children('td[data-table="幣別"]').find('.hidden-phone').text().trim(),
          cash: {
            buy: $element.children('td[data-table="本行現金買入"]').eq(0).text(),
            sale: $element.children('td[data-table="本行現金賣出"]').eq(0).text()
          },
          recent: {
            buy: $element.children('td[data-table="本行即期買入"]').eq(0).text(),
            sale: $element.children('td[data-table="本行即期賣出"]').eq(0).text()
          }
        });
      });
      var output = {
        status: 200,
        message: '台灣銀行匯率資料',
        updatetime: $('p.text-info').find('.time').text(),
        data: items.filter((item, index) => { // 去除重複
          return items.indexOf(item) === index
        })
      };

      res.send(output);
    });
});

module.exports = app