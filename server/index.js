const express = require('express')
const app = express()
const viewRouter = require('./view-router')
const apiRouter = require('./api-router')


app.use('/', viewRouter)

app.use('/api', apiRouter)


app.listen(8080)
