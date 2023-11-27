const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const startDB = require("../database/database.js");

beforeAll(() => {
  return startDB();
}, 20000);

afterAll((done) => {
  done();
});

describe("Get comments", () => {
  it("should be able to retrieve the public map list", async () => {
    const res = await request(app)
      .get("/comment/655ed5964e3338ba17638185?page=1&limit=20")
      .expect(200);

    expect(res.type).toEqual("application/json");
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});



