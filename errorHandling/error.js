exports.errorHandler404 = (err, res) => {

    
    res.status(404).send({msg: 'Not Found' });

    
  }




exports.errorHandler400 = (err, req, res, next) => {

    res.status(400).send({msg: 'Bad Request'})
}
