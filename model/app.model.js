
const db = require('../db/connection')


const apiObj = require('../endpoints.json')




exports.selectTopics = () => {

   
  return  db.query('SELECT * FROM topics').then((content)=> {

    return content.rows

   })

} 


exports.selectArticleById = (id,res) => {
    
    return db.query(`SELECT * FROM articles WHERE article_id = $1`,[id]).then((articleObj)=> {
      if (articleObj.rows.length === 0) {return Promise.reject()}
      return articleObj.rows
     })

}