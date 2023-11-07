const request = require('supertest')
const app = require('../app.js')

afterAll(done => {
  done();
})

describe('Ping index', () => {
    it('should be able to reach the index of the server', async () => {
      const res = await request(await app)
        .get('/')
        .expect(200)
    })
  })