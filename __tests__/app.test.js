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








afterAll(() => db.end());