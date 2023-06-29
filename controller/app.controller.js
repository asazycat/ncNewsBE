

const {selectTopics,selectAllApi, selectArticleById, selectAllArticles,selectCommentsByArticleId} = require('../model/app.model')
const apiList = require('../endpoints.json')


exports.getTopics = (req,res,next)=> {
   
    selectTopics().then((topics)=> {
      res.status(200).send({topics})
    }).catch(next)

}

exports.getAllApi = (req,res,next) => {

 res.status(200).send(apiList)
  


}




exports.getArticleById = (req,res,next) => {
 
     const {article_id} = req.params
     
      selectArticleById(article_id).then((articleObj) => {
        
      res.status(200).send(articleObj)
  }).catch(next)
}







exports.getArticles = (req,res,next) => {

  selectAllArticles().then((allArticlesArray) => {
 
    res.status(200).send({articles:allArticlesArray})
  }).catch(next)
}



exports.getCommentsByArticleId = (req,res,next) => {
  const {article_id} = req.params



     selectCommentsByArticleId(article_id).then((comments)=> {
    
      res.status(200).send({"comments": comments})
     }).catch(next)

}