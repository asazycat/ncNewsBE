exports.errorHandler404 = (err, res) => {

 
    res.status(404).send({msg: 'Not Found' });

    
  }



 


exports.errorHandler400 = (err, req, res, next) => {

    res.status(400).send({msg: 'Bad Request'})
}


exports.psqlErrors = (err, req, res, next) => {

 console.log(err)


  if (err.code === '23503')  {
   return res.status(404).send({msg: 'Not Found,try' });
  }
  if (err.code === '22P02') { return res.status(400).send({msg: 'Bad Request' });}
  next(err)
}