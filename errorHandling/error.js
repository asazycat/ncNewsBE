exports.errorHandlerOne = (err, res) => {

    
    res.status(404).send({msg: 'Not Found' });

    
  }




exports.errorHandlerTwo = (err, req, res, next) => {

    res.status(400).send({msg: 'Bad Request'})
}
