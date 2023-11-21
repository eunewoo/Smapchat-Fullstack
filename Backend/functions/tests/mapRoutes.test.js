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

describe("Get public maps", () => {
  it("should be able to retrieve the public map list", async () => {
    const res = await request(app)
      .get("/map/public?sort=date&page=1&limit=2")
      .expect(200);

    expect(res.type).toEqual("application/json");
  });
});

describe("Get searched maps", () => {
  it("should be able to search the public map list", async () => {
    const res = await request(app)
      .get("/map/public/search?query=map&sort=date&page=1&limit=2")
      .expect(200);

    expect(res.type).toEqual("application/json");
    expect(res.body[0].title.includes("map"));
  });
});
