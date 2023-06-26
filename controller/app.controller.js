

const {selectTopics} = require('../model/app.model')



exports.getTopics = (req,res,next)=> {
    console.log("controller")
    selectTopics().then((topics)=> {
      res.status(200).send({topics})
    })

}



