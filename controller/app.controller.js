

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
  
     const  {id} = req.params
  selectArticleById(id).then((articleObj) => {
    res.status(200).send(articleObj)
  })
}

