const express = require('express')
const {errorHandlerOne, errorHandlerTwo} = require('./errorHandling/error')
const {getTopics,getAllApi,getArticleById} = require('./controller/app.controller')
const app = express()

app.use(express.json())



app.get('/api/topics',  getTopics)
app.get('/api', getAllApi)



app.get('/api/articles/:article_id', getArticleById)

app.all('*', errorHandlerOne);
app.use('/api/articles/notAnId', errorHandlerTwo)





module.exports = app 