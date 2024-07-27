import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp";
//import express from "express";

//const app = express();

describe("/api/auth", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/anson_test")
      .then(() => console.log("Connected to TestDB"))
      .catch((error) => console.log(`Error: ${error}`));

    app = createApp();
  });

  it("should return 401 when not logged in", async () => {
    const response = await request(app).get("/api/auth/status");
    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});

// app.get("/hello", (req, res) => res.status(200).send({msg: "test_obj"}));

// describe("hello endpoint", () => {
//   it("get /hello and return a status of 200", async () => {
//     const response = await request(app).get("/hello");
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({msg: "test_obj"});
//   });
// });
