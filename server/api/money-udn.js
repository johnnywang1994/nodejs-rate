const express = require('express')
const app = express.Router()

const { phantomHandler } = require('../module')


app.get('/', (req, res) => {
  res.end('Please enter News type...');
})


// First News
// http://localhost:8080/api/money-news/first
app.get('/first', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  let $tab_content_url = 'https://money.udn.com/common/maintabs';
  phantomHandler($tab_content_url, function($) {
    let firstNews = {
      title: $('#carousel .wmark + h1').text(),
      imageUrl: $('#carousel img').eq(0).attr('src'),
      link: $('#carousel a').eq(0).attr('href')
    }

    res.end(JSON.stringify({
      status: 200,
      type: 'first-news',
      data: firstNews,
      datetime: new Date().toLocaleString()
    }))
  });
})


// Break News
// eg. http://localhost:8080/api/money-news/break/1
app.get('/break/:page', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  let page = req.params.page // 頁數

  if (!page) return res.end('Please enter the page number...')
  
  let $break_news_url = `https://money.udn.com/money/breaknews/1001/0/${page}`
  phantomHandler($break_news_url, function($) {
    let breakNews = []
    let rankingBody = $('#ranking_body tr:not(:first-child)')
    
    rankingBody.each((i, topic)=>{
      let $topic = $(topic);
      breakNews.push({
        link: $topic.children('td').eq(0).children('a').attr('href'),
        title: $topic.children('td').eq(0).text().trim(),
        type: $topic.children('td').eq(1).text(),
        datetime: $topic.children('td').eq(2).text(),
        watched: $topic.children('td').eq(3).text(),
      })
    });

    res.end(JSON.stringify({
      status: 200,
      type: 'break-news',
      data: breakNews,
      datetime: new Date().toLocaleString()
    }))
  });
})


module.exports = app


