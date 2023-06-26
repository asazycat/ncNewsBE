

const {selectTopics} = require('../model/app.model')



exports.getTopics = (req,res,err)=> {
    console.log("controller")
    selectTopics().then((topics)=> {
      
      //  if(err) res.status(404).send({msg:'Invalid input'})

        res.status(200).send({topics})
    })
}



