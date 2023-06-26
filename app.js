const express = require('express')

const {getTopics} = require('./controller/app.controller')
const app = express()



app.get('/api/topics',  getTopics)



app.use((err, req, res, next) => {
    console.log("going through middleware");
    res.status(404).send({ msg: 'Invalid input' });
  });



module.exports = app 