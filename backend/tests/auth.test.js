import request from "supertest";
import app from "../server.js";

describe("Auth APIs", () => {
  let testUser = {
    name: "TestUser",
    email: "test@example.com",
    phone: "9876543210",
    fullname: "Test User",
    country: "India",
    password: "123456"
  };

  test("Register user successfully", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  test("Login user successfully", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
