const request = require('supertest')
const app = require('../app.js')

describe('Get Endpoints', () => {
  it('should be able to retrieve the user ID list', async () => {
    const res = await (request(app)
      .get('/Users')
      .send())
    expect(res.statusCode).toEqual(200)
  })
})
