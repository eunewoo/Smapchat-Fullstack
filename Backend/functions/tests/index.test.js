const request = require("supertest");
const app = require("../app.js");
const startDB = require("../database/database.js");

beforeAll(() => {
  startDB();
});

afterAll((done) => {
  done();
});

describe("Ping index", () => {
  it("should be able to reach the index of the server", async () => {
    const res = await request(app).get("/").expect(200);
  });
});
