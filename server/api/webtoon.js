const express = require('express')
const app = express.Router()

const { phantomHandler } = require('../module')


app.get('/', (req, res) => {
  res.end('Please enter title_no of the comic...')
})

app.get('/:title', (req, res) => {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

  let title_no = req.params.title;
  let page = req.query.page || '1';


  let $webtoon_url = `https://www.webtoons.com/zh-hant/drama/ohmymuse/list?title_no=${title_no}&page=${page}`
  let breakNews = []
  phantomHandler($webtoon_url, function($) {
    let content = $('#_listUl li');
    content.each((i, topic)=>{
      let $topic = $(topic).children('a').eq(0);
      breakNews.push({
        iconUrl: $topic.children('span').eq(0).children('img').eq(0).attr('src'),
        name: $topic.children('span').eq(1).text().trim(),
        date: $topic.children('span').eq(3).text(),
        liked: $topic.children('span').eq(4).text().replace('like', '').trim(),
        link: $topic.attr('href')
      })
    });

    res.end(JSON.stringify({
      status: 200,
      info: {
        title: $('#content .subj').eq(0).text(),
        type: $('#content .g_drama').eq(0).text(),
        star: $('#_starScoreAverage').text(),
        updatetime: $('#_asideDetail .day_info').eq(0).text().replace('UP', '').trim(),
        summary: $('#_asideDetail .summary').eq(0).text()
      },
      page,
      data: breakNews,
      datetime: new Date().toLocaleString()
    }))
  });
  

})


module.exports = app