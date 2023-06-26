const request = require('supertest')

const seed = require('../db/seeds/seed')

const db = require('../db/connection')

const app = require('../app')
const testData = require('../db/data/test-data/index')



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



test('status:404, responds with an error message ', () => {
    return request(app)
      .get('/api/topics/notARoute')
      .expect(404)
      
  });
    })






afterAll(() => db.end());