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




  describe.only('test to see if article returned is empty', ()=> {
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





        describe('test to see if input id of article exists', ()=> {


            
            test('to see if object is returned', ()=> { 
            return request(app)
           .get(`/api/articles`)
            .expect(201)
            .then(({body}) => {
        
                expect(body.topics.length).toBe(13)
          
            body.forEach(()=>{
        
            expect(body).toHaveProperty("article_id", expect.any(Number))
            expect(body).toHaveProperty("title", expect.any(String)) 
            expect(body).toHaveProperty("topic", expect.any(String))
            expect(body).toHaveProperty("author", expect.any(String))
              
            expect(body).toHaveProperty("created_at", expect.any(String))
            expect(body).toHaveProperty("votes", expect.any(Number))
            expect(body).toHaveProperty("article_img_url", expect.any(String))
            expect(body).toHaveProperty("comment_count", expect.any(Number))
            })


            })
            })
            })












afterAll(() => db.end());