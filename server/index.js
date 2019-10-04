const express = require('express')
const app = express()
const viewRouter = require('./view-router')
const apiRouter = require('./api-router')


app.set('port', process.env.PORT || 8080);

app.use('/', viewRouter)

app.use('/api', apiRouter)


app.listen(app.get('port'), function(){
  console.log('Express Server listening on port: '+app.get('port'));
});