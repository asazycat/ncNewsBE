exports.errorHandlerOne = (err, res) => {
    console.log('Error Handler 1')
    
    res.status(404).send({msg: 'Not Found' });

    
  }




exports.errorHandlerTwo = (err, req, res, next) => {
     console.log('Error Handler 2')
    res.status(400).send({msg: 'Bad Request'})
}
