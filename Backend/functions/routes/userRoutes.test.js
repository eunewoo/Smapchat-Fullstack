const request = require('supertest')
const mongoose = require("mongoose");
const app = require('../app.js')

afterAll(done => {
  done();
})

describe('Get Endpoints', () => {
  it('should be able to retrieve the user ID list', async () => {
    const res = await request(await app)
      .get('/Users')
      .expect(200)
  })
})
