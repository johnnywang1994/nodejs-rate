const path = require('path')
const express = require('express')
const app = express()
const apiRouter = require('./api-router')


app.set('port', process.env.PORT || 8080);

app.use('/', express.static(path.resolve(__dirname, '../frontend/dist')));

app.use('/gitbook', express.static(path.resolve(__dirname, '../gitbook/_book')));

app.use('/api', apiRouter);


app.get('*', (req, res) => {
  res.end('Error 404, Page not found...');
});


app.listen(app.get('port'), function(){
  console.log('Express Server listening on port: '+app.get('port'));
});