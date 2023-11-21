const request = require('supertest')
const mongoose = require("mongoose");
const app = require('../app.js')
const startDB = require('../database/database.js');

beforeAll(() => {
  return startDB();
}, 20000)

afterAll(done => {
  done();
})

describe('Get Endpoints', () => {
  it('should be able to retrieve the user ID list', async () => {
    const res = await request(app)
      .get('/Users')
      .expect(200)
  })
})
