
const db = require('../db/connection')


const apiObj = require('../endpoints.json')




exports.selectTopics = () => {

   
  return  db.query('SELECT * FROM topics').then((content)=> {

    return content.rows

   })

} 


