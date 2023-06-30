const express = require('express')
const {errorHandler404, errorHandler400, psqlErrors} = require('./errorHandling/error')
const {getTopics,getAllApi,getArticleById, getArticles,getCommentsByArticleId,addCommentByArticleId,} = require('./controller/app.controller')
const app = express()

app.use(express.json())



app.get('/api/topics',  getTopics)
app.get('/api', getAllApi)



app.get('/api/articles/:article_id', getArticleById)







app.get('/api/articles', getArticles)







app.get('/api/articles/:article_id/comments', getCommentsByArticleId)







app.post('/api/articles/:article_id/comments', addCommentByArticleId)




app.all('*', errorHandler404);

app.use(psqlErrors)

app.use(errorHandler400)






module.exports = app 