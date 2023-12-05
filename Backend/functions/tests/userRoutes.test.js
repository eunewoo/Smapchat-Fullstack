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

describe("Get Endpoints", () => {
  it("should be able to retrieve the user ID list", async () => {
    const res = await request(app).get("/Users").expect(200);
  });
});

describe("Authenticate", () => {

  var userID = "";

  it("can register a user", async () => {
    const res = await request(app)
      .post("/User/create")
      .send({email: "Jest@Testing.com", username: "Jest Tester", password: "Password", avatar: ""})
      .expect(201);

    userID = res.body.user.userId;
  });

  it("can login", async () => {
    await request(app)
      .post("/User/login")
      .send({email: "Jest@Testing.com", password: "Password"})
      .expect(200);
  });

  it("can delete", async () => {
    await request(app)
      .delete(`/User/delete/${userID}`)
      .expect(200);
  })
});
