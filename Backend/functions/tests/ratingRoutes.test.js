const request = require("supertest");
const app = require("../app.js");
const startDB = require("../database/database.js");

beforeAll(() => {
  return startDB();
}, 20000);

afterAll((done) => {
  done();
});

describe("Rating Tests", () => {
  let avgRateBeforeDelete;

  it("should create a rating with userId '6563f21c7101997e5f7b4072' and mapId '656537ad7a1b6f9f380bb6d5'", async () => {
    await request(app)
      .post("/rate/create")
      .send({
        userId: "6563f21c7101997e5f7b4072",
        mapId: "656537ad7a1b6f9f380bb6d5",
        rate: 5,
      })
      .expect(200);
  });

  it("should create another rating with a different userId and the same mapId '656537ad7a1b6f9f380bb6d5'", async () => {
    await request(app)
      .post("/rate/create")
      .send({
        userId: "65617bb06fd28d8b794545bf",
        mapId: "656537ad7a1b6f9f380bb6d5",
        rate: 5,
      })
      .expect(200);
  });

  it("should update the rating for userId '6563f21c7101997e5f7b4072' to 3 and check if avgRate is now 4", async () => {
    const res = await request(app)
      .post("/rate/create")
      .send({
        userId: "6563f21c7101997e5f7b4072",
        mapId: "656537ad7a1b6f9f380bb6d5",
        rate: 3,
      })
      .expect(200);

    const avgRateRes = await request(app)
      .get("/rate/656537ad7a1b6f9f380bb6d5") // Updated endpoint to fetch average rate
      .expect(200);

    expect(avgRateRes.body.avgRate).toEqual(4);
  });

  it("should delete the rating for userId '6563f21c7101997e5f7b4072' and check if avgRate is now 5", async () => {
    await request(app)
      .delete("/rate/delete/6563f21c7101997e5f7b4072")
      .expect(200);

    // Fetch the average rate for the map to check the new average rate
    const avgRateRes = await request(app)
      .get("/rate/656537ad7a1b6f9f380bb6d5") // Updated endpoint to fetch average rate
      .expect(200);

    expect(avgRateRes.body.avgRate).toEqual(5);
  });
});
