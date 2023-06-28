

const {selectTopics,selectAllApi, selectArticleById} = require('../model/app.model')
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
     
      selectArticleById(article_id,res).then((articleObj) => {
        
      res.status(200).send(articleObj)
  }).catch(next)
}

exports.getArticles = (req,res,next) => {

  selectAllArticles().then((allArticlesArray) => {



    res.status(201).send(allArticlesArray)
  })
}