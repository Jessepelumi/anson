import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp";

describe("create user and login", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/anson_test")
      .then(() => console.log("Connected to TestDB"))
      .catch((error) => console.log(`Error: ${error}`));

    app = createApp();
  });

  it("should create the user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "jeolad_",
      firstName: "Jesse_",
      password: "jeolad01$_",
    });
    expect(response.statusCode).toBe(201);
  });

  it("should log user in and visit /api/auth/status and return authenticated user", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({
        username: "jeolad_",
        password: "jeolad01$_",
      })
      .then((res) => {
        return request(app)
          .get("/api/auth/status")
          .set("Cookie", res.headers["set-cookie"]);
      });
    expect(response.statusCode).toBe(200);
    // TODO: check for cookie
  });

  // it("should visit /api/auth/status and return authenticated user", async () => {
  //   const response = await request(app).get("/api/auth/status");
  //   expect(response.statusCode).toBe(200);
  // });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
