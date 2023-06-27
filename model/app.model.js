
const db = require('../db/connection')


const apiObj = require('../endpoints.json')




exports.selectTopics = () => {

   
  return  db.query('SELECT * FROM topics').then((content)=> {

    return content.rows

   })

} 


exports.selectArticleById = (id) => {
    
    return db.query(`SELECT * FROM articles WHERE article_id = $1`,[id]).then((articleObj)=> {
    
      return articleObj.rows[0]
     })

}