import request from "supertest";
import app from "../server.js";

describe("Profile APIs", () => {
  let token;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "123456" });
    token = loginRes.body.token;
  });

  test("View user profile", async () => {
    const res = await request(app)
      .get("/api/v1/profile/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("profile");
    expect(res.body.profile).toHaveProperty("email");
  });

  test("Update user profile", async () => {
    const res = await request(app)
      .put("/api/v1/profile/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ fullname: "Updated Test User", country: "India Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Profile updated successfully");
    expect(res.body.profile.fullname).toBe("Updated Test User");
  });
});
