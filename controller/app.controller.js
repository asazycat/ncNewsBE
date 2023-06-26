

const {selectTopics} = require('../model/app.model')



exports.getTopics = (req,res,err)=> {
    console.log("controller")
    selectTopics().then((topics)=> {
      res.status(200).send({topics})
    })
    .catch(err =>  res.status(404).send({msg:'Input invalid'}))
    
}



