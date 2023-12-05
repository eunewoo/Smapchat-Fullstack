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
      .get("/comment/656537ad7a1b6f9f380bb6d5?page=1&limit=20")
      .expect(200);

    expect(res.type).toEqual("application/json");
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe("Create a comment, like it, and delete it", () => {
  let createdCommentId;

  it("should create a new comment", async () => {
    const newComment = {
      mapId: "656537ad7a1b6f9f380bb6d5",
      userId: "65617bb06fd28d8b794545bf",
      content: "This is a test comment",
    };

    const res = await request(app)
      .post("/comment/create")
      .send(newComment)
      .expect(201);

    expect(res.body).toHaveProperty("_id");
    createdCommentId = res.body._id;
  });

  it("should like the created comment", async () => {
    const likeData = {
      userId: "65617bb06fd28d8b794545bf",
      commentId: createdCommentId,
    };

    await request(app).post("/comment/like").send(likeData).expect(200);
  });

  it("should delete the created comment", async () => {
    console.log("/comment/deletez");
    await request(app)
      .delete("/comment/delete")
      .send({ commentId: createdCommentId })
      .expect(200);
  });
});
