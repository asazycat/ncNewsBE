
const db = require('../db/connection')


const apiObj = require('../endpoints.json')




exports.selectTopics = () => {

   
  return  db.query('SELECT * FROM topics').then((content)=> {

    return content.rows

   })

} 


exports.selectArticleById = (id) => {
    
    return db.query(`SELECT * FROM articles WHERE article_id = $1`,[id]).then((articleObj)=> {
      if (articleObj.rows.length === 0) {return Promise.reject()}
      return articleObj.rows[0]
     })

}



exports.selectAllArticles = () => {


  return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id  GROUP BY articles.article_id ORDER BY articles.created_at DESC
  ;`).then((articleObj)=> {

    
       return articleObj.rows
   })

}







exports.selectCommentsByArticleId = (id) => {


  return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id]).then((article) => {
       
    

        if (article.rows.length === 0) {
    
          return Promise.reject()}
      
          return  db.query(`SELECT * FROM comments WHERE article_id = $1`,[id]).then((comment)=>{
           
              if (comment.rows.length === 0 ) {return []}
        
            return comment.rows
            
            })
       
  })

   
  




}











exports.insertCommentByArticleId = (newComment, id) => {

 const {username,body} = newComment
 const {article_id} = id
     


  return db.query('INSERT INTO comments (author,body,article_id, votes) VALUES ($1, $2, $3,$4) RETURNING *;', [username,body,article_id,0]).then((returnContents) => {
   
    return returnContents.rows[0]
  })

}



exports.changeArticleById = (id, votes) => {


    
 
  return db.query('UPDATE articles SET votes = votes + $1 WHERE articles.article_id = $2 RETURNING *',[votes,id]).then((article) => {
   
   
     if(article.rows.length === 0) {
     
      return Promise.reject()}


return article.rows[0]
  })
}







exports.removeCommentById = (id) => {


 
  return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [id]).then((deleted)=> {
       
    
    if(deleted.rows.length === 0) {
        
      return Promise.reject()}
    
      return deleted.rows[0]
    })
  }
  







  




exports.selectUsers = () => {


  return db.query('SELECT * FROM users;').then((users)=> {
    return users.rows
  })
}