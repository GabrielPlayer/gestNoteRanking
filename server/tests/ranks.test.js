const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/ranks", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/ranks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/ranks/:hash", () => {
  it("should return the user's rank", async () => {
    const res1 = await request(app).get("/api/ranks/test1");
    expect(res1.statusCode).toBe(200);
    expect(res1.body.rank).toBe(1);
    const res2 = await request(app).get("/api/ranks/test2");
    expect(res2.statusCode).toBe(200);
    expect(res2.body.rank).toBe(res2.body.total);
    const res3 = await request(app).get("/api/ranks/test_");
    expect(res3.statusCode).toBe(404);
  });
});

describe("POST /api/ranks", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .post("/api/ranks")
        .send({
          hash: "test3",
          year: 0,
          maquette: 0,
          departement : 0,
          grade: 3,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.grade.$numberDecimal).toBe("3");
    });
  });

describe("POST /api/ranks", () => {
  it("should create a user", async () => {
    const res = await request(app)
    .post("/api/ranks")
    .send({
      hash: "test4",
      year: 0,
      maquette: 0,
      departement : 0,
      grade: 4,
  });
    expect(res.statusCode).toBe(201);
    expect(res.body.grade.$numberDecimal).toBe("4");
  });
});

describe("DELETE  /api/ranks/:hash", () => {
  it("should delete  a user", async () => {
    const res = await request(app).delete("/api/ranks/test4")
    expect(res.statusCode).toBe(200);
  });
});