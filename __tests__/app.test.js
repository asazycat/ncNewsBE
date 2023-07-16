const request = require('supertest')

const seed = require('../db/seeds/seed')

const db = require('../db/connection')

const app = require('../app')
const testData = require('../db/data/test-data/index')



const apiObj = require('../endpoints.json')
beforeEach(()=> seed(testData))



describe('200 response /api/topics', ()=> {




    test('checks to see if array isn"t empty', ()=> {
     return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
                 
        expect(body.topics.length).toBe(3)
        body.topics.forEach((topic)=> {
      
                 expect(topic).toHaveProperty("slug", expect.any(String))
           expect(topic).toHaveProperty("description", expect.any(String))
                
            })
        }
    )

})



    })

describe('404 err', ()=> {

    test('status:404, responds with an error message ', () => {
        return request(app)
          .get('/api/notARoute')
          .expect(404).then(({body})=> expect(body.msg).toEqual('Not Found'))
          
      });

    })



describe('Getting a list of available api', ()=> {
    test('returning api list', ()=> {

        return request(app).get('/api').then(({body})=>{
      
            expect(body).toEqual(apiObj)
        })

    })
  })




  describe('test to see if article returned is empty', ()=> {
    test('to see if object is returned', ()=> { 
    return request(app)
   .get(`/api/articles/70`)
    .expect(404)
    .then(({body}) => {

  expect(body).toEqual({msg: 'Not Found' })
    })
    })
    })















  describe('test to see if input id of article exists', ()=> {
    test('to see if object is returned', ()=> { 
    return request(app)
   .get(`/api/articles/2`)
    .expect(200)
    .then(({body}) => {

expect(body).toHaveProperty("article_id", expect.any(Number))
    expect(body).toHaveProperty("title", expect.any(String)) 
    expect(body).toHaveProperty("topic", expect.any(String))
    expect(body).toHaveProperty("author", expect.any(String))
    expect(body).toHaveProperty("body", expect.any(String))
    expect(body).toHaveProperty("created_at", expect.any(String))
    expect(body).toHaveProperty("votes", expect.any(Number))
    expect(body).toHaveProperty("article_img_url", expect.any(String))
    
    })
    })
    })
    


    describe('400 err' , ()=> {

        test('status:400, responds with an error message ', () => {
            return request(app)
              .get('/api/articles/notAnId')
              .expect(400).then(({body})=> expect(body.msg).toEqual('Bad Request'))
              
          });
    
        })





        describe('test to see if all articles are returned', ()=> {


            
            test('to see if articles array is returned', ()=> { 
            return request(app)
           .get(`/api/articles`)
            .expect(200)
            .then(({body}) => {
        
                expect(body.articles.length).toBe(13)
          
            body.articles.forEach((article)=>{
        
            expect(article).toHaveProperty("article_id", expect.any(Number))
            expect(article).toHaveProperty("title", expect.any(String)) 
            expect(article).toHaveProperty("topic", expect.any(String))
            expect(article).toHaveProperty("author", expect.any(String))
              
            expect(article).toHaveProperty("created_at", expect.any(String))
            expect(article).toHaveProperty("votes", expect.any(Number))
            expect(article).toHaveProperty("article_img_url", expect.any(String))
            expect(article).toHaveProperty("comment_count", expect.any(String))
            })

            expect(body.articles).toBeSorted({ descending: true });
            })
            })
            })




            describe('gets an array of comments back for the specified id', ()=> {
                test('check if the array has been returned with comments', ()=> {
   
                 return  request(app).get('/api/articles/3/comments').expect(200).then(({body})=>{
   
                       expect(body.comments.length).toBe(2)
   
   
                       body.comments.forEach((eachComment) => {
   
               expect(eachComment).toHaveProperty("comment_id", expect.any(Number))
               expect(eachComment).toHaveProperty("votes", expect.any(Number)) 
               expect(eachComment).toHaveProperty("created_at", expect.any(String))
               expect(eachComment).toHaveProperty("author", expect.any(String))
                 
               expect(eachComment).toHaveProperty("body", expect.any(String))
               expect(eachComment).toHaveProperty("article_id", expect.any(Number))
                       })

                       expect(body.comments).toBeSorted({ ascending: true });
                   })
                })
                     })
   





               describe('getting error 400 for invalid data type', ()=> {
                test('inputing non number into id should return 400', ()=> {
                    request(app).get("/api/articles/KatherineRules/comments").expect(400).then(({body})=> {
                        expect(body.msg).toEqual('Bad Request')})
                    })})
            
               



               
describe('404 err', ()=> {

    test('status:404, responds with an error message for id that doesn"t exist', () => {
        return request(app)
          .get("/api/articles/6969420/comments")
          .expect(404).then(({body})=> expect(body.msg).toEqual('Not Found'))
          
      });

    })


    describe('valid id but it doesn"t have it"s own comments', ()=> {

        test('status:200, responds with an empty array', () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200).then(({body})=> expect(body.comments).toEqual([]))
              
          });
    
        })



        

        describe('Checking if body is in proper format or proper username is in it', ()=>{
            test('check if missing properties', ()=> {
             const newItem = {}
                return request(app).post('/api/articles/1/comments').send(newItem).expect(400).then((response)=> {
                    expect(response.body).toEqual({msg: "Bad Request"})
                })

       })


          
        })
            
        
             test('check to see if username is in achieve of the comment posted', ()=> {

             const   newItem = {'username': "AsazyCat" , "body": "illegal comment"}
                request(app).post('/api/articles/1/comments').send(newItem).expect(400).then((response)=> {
                    expect(response.body).toEqual({"msg":"Bad Request"})
                })
    })
         


       describe('check if entity has been posted successfully', ()=> {
        test('checking post', ( ) => {
        const newItem = {
            "username": "butter_bridge",
            "body": "I will take this planet and rule it with cats",
            
        }
           return request(app).post('/api/articles/3/comments').send(newItem).expect(201).then((response)=> {
          
            expect(response.body.postedComment).toHaveProperty("comment_id", expect.any(Number))
            expect(response.body.postedComment).toHaveProperty("author", "butter_bridge")
            expect(response.body.postedComment).toHaveProperty("body", "I will take this planet and rule it with cats")
            expect(response.body.postedComment).toHaveProperty("article_id", 3)
            expect(response.body.postedComment).toHaveProperty("created_at", expect.any(String))
            expect(response.body.postedComment).toHaveProperty("votes", 0) 
              
           })
 })

       })



     


       describe('check if entity has been posted successfully', ()=> {
        test('checking post', ( ) => {
        const newItem = {
            "username": "butter_bridge",
            "body": "I will take this planet and rule it with cats",
            "votes": 10
            
        }
           return request(app).post('/api/articles/3/comments').send(newItem).expect(201).then((response)=> {
          
            expect(response.body.postedComment).toHaveProperty("comment_id", expect.any(Number))
            expect(response.body.postedComment).toHaveProperty("author", "butter_bridge")
            expect(response.body.postedComment).toHaveProperty("body", "I will take this planet and rule it with cats")
            expect(response.body.postedComment).toHaveProperty("article_id", 3)
            expect(response.body.postedComment).toHaveProperty("created_at", expect.any(String))
            expect(response.body.postedComment).toHaveProperty("votes", 0) 
              
           })
 })

       })










       describe('getting error 400 for invalid data type for POST', ()=> {
        test('inputing non number into id should return 400', ()=> {
            const newItem = {
                "username": "butter_bridge",
                "body": "I will take this planet and rule it with cats",
                
            }

            request(app).post("/api/articles/KatherineRules/comments").send(newItem).expect(400).then((response)=> {
              
                expect(response.body.msg).toEqual('Bad Request')})
            })})
    
       



       
describe('404 err for POST input of number not there', ()=> {
    const newItem = {
        "username": "butter_bridge",
        "body": "I will take this planet and rule it with cats",
        
    }
test('status:404, responds with an error message for id that doesn"t exist', () => {
return request(app)
  .post("/api/articles/15/comments").send(newItem)
  .expect(404).then((response)=> expect(response.body.msg).toEqual('Not Found'))
  
});

})


        



describe('PATCH /api/articles/:article_id', ()=> {

    test('Check if body has correct properties inside', ()=> {
        const newItem = {
            'invalid property':3
        }

       return request(app).patch('/api/articles/3').send(newItem).expect(400).then((returnedContents) =>
        {
              expect(returnedContents.body.msg).toEqual('Bad Request')

        }

       )
    })



     

    test('Check if article_id present is valid data type but doesn"t exist: Should return 404', ()=> {
         

        const newItem = {
             "inc_votes": 10

        }

     return request(app).patch('/api/articles/15').send(newItem).expect(404).then((returnedContents) =>
        {

            expect(returnedContents.body.msg).toEqual('Not Found')
        }
     )

    })  
    
    

    test('Check if article inside is non valid data type: Shoudl return 400' ,()=>{
       
        const newItem = {
            inc_votes: 'y'
        } 

       return request(app).patch('/api/articles/kate').send(newItem).expect(400).then((returnedContents) =>  {
        
            expect(returnedContents.body.msg).toEqual('Bad Request')
            
        
    })

    })




    test('Check if body is empty and returns error 400', ()=> {

        const newItem = {}

      return  request(app).patch('/api/articles/3').send(newItem).expect(400).then((returnedContents) => 
        {
            expect(returnedContents.body.msg).toEqual('Bad Request')
            
        })

    })





    test('Check if the article vote has been patched to database', ()=> {
      
        const newItem = {
         "inc_votes":10

        }

       return request(app).patch('/api/articles/3').send(newItem).expect(200).then((returnedContents) => {
        {
            expect(returnedContents.body).toHaveProperty("article_id", 3)
            expect(returnedContents.body).toHaveProperty("title", expect.any(String)) 
            expect(returnedContents.body).toHaveProperty("topic", expect.any(String))
            expect(returnedContents.body).toHaveProperty("author", expect.any(String))
            expect(returnedContents.body).toHaveProperty("body", expect.any(String))
            expect(returnedContents.body).toHaveProperty("created_at", expect.any(String))
            expect(returnedContents.body).toHaveProperty("votes", expect.any(Number))
            expect(returnedContents.body).toHaveProperty("article_img_url", expect.any(String))
            
        }

    })
    })


    test('check if extra porperties in body still patches the votes ', ()=> {
        const newItem = {
            "inc_votes":10,
            'extraProperty': 'invalid'

        }

       return request(app).patch('/api/articles/3').send(newItem).expect(200).then((returnedContents) => 
        {
            expect(returnedContents.body).toHaveProperty("article_id", 3)
            expect(returnedContents.body).toHaveProperty("title", expect.any(String)) 
            expect(returnedContents.body).toHaveProperty("topic", expect.any(String))
            expect(returnedContents.body).toHaveProperty("author", expect.any(String))
            expect(returnedContents.body).toHaveProperty("body", expect.any(String))
            expect(returnedContents.body).toHaveProperty("created_at", expect.any(String))
            expect(returnedContents.body).toHaveProperty("votes", expect.any(Number))
            expect(returnedContents.body).toHaveProperty("article_img_url", expect.any(String))
            
        }
       
    )
})


})









// describe('Testing for Task 9', ()=> {

    

//     test('test to see if entity is deleted successfully',()=> {
    
//         request(app).delete("/api/comments/7").expect(204).then((returnedContents)=> {
            
//              expect(returnedContents).toEqual({})
    
//     })
    
//     })



//     test('test to see if valid input but doesn"t exist',()=> {
    
       
//         return request(app).delete('/api/comments/1000').expect(404).then((returnedContents) =>
//         {

//             expect(returnedContents.body.msg).toEqual('Not Found')
//         }
//      )
    
//     })



//     // test('test to see if the input is invalid',()=> {
    
//     //     return  request(app).delete("/api/comments/katerineRules").expect(400).then((returnedContents) => 
//     //     {
//     //         expect(returnedContents.body.msg).toEqual('Bad Request')
            
//     //     })

    
//     // })



    

    
//     })







// describe.only("users",() => {

// test('Get users', ()=> {

// return request(app).get('/api/users').expect(200).then(({body})=> {
//     expect(body.users.length).toBe(4)
//     body.users.forEach((user)=> {
  
//              expect(user).toHaveProperty("username", expect.any(String))
//        expect(user).toHaveProperty("name", expect.any(String))
//        expect(user).toHaveProperty("avatar_url", expect.any(String))
            
//         })
// })

// })})







afterAll(() => db.end())