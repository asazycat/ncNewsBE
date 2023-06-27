const express = require('express')
const {errorHandlerOne} = require('./errorHandling/error')
const {getTopics,getAllApi,getArticleById} = require('./controller/app.controller')
const app = express()

app.use(express.json())



app.get('/api/topics',  getTopics)
app.get('/api', getAllApi)



app.get('/api/articles/:article_id', getArticleById)

app.all('*', (err, res) => {
  console.log("going through middleware");
  res.status(404).send({msg: 'Not Found' });
});






module.exports = app 