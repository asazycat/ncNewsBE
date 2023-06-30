exports.errorHandler404 = (err, res) => {

    
    res.status(404).send({msg: 'Not Found' });

    
  }



  // exports.errorHandler404post = (err, req, res,next) => {

    
  //   res.status(404).send({msg: 'Not Found' });

    
  // }


exports.errorHandler400 = (err, req, res, next) => {

    res.status(400).send({msg: 'Bad Request'})
}


exports.psqlErrors = (err, req, res, next) => {

  if (err.code === '23503')  {
   return res.status(404).send({msg: 'Not Found' });
  }
  
  next(err)
}