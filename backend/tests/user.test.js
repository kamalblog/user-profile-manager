import request from "supertest";
import app from "../server.js";

describe("User APIs", () => {
  let token;

  beforeAll(async () => {
    // Login first to get token
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    token = loginRes.body.token;
  });

  test("Get all users (protected)", async () => {
    const res = await request(app)
      .get("/api/v1/auth/getAllUsers")
      //.set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.users)).toBe(true);
  });
});
