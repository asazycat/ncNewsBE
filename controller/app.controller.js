

const {selectTopics,selectAllApi} = require('../model/app.model')



exports.getTopics = (req,res,next)=> {
    console.log("controller")
    selectTopics().then((topics)=> {
      res.status(200).send({topics})
    }).catch(next)

}

exports.getAllApi = (req,res,next) => {

 res.status(200).send(apiList)
  


}

