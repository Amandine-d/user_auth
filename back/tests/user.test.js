const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = mongoose.model("User");

const user = {
  email: "test@example.com",
  password: "p@ssw0rd!",
};

describe("app", () => {

  it("POST /register", async () => {
    expect.assertions(2);
    
    User.deleteMany({ "email": user.email }).exec();

    const countBefore = await User.countDocuments().exec();
    const res = await request(app).post("/register").send(user).expect(200);
    expect(res.body.email).toEqual(user.email);
    const countAfter = await User.countDocuments().exec();
    expect(countAfter).toEqual(countBefore + 1);

    User.deleteMany({ "email": user.email }).exec();
  });

  it("GET /users", async () => {
    expect.assertions(1);
    
    const countUsers = await User.countDocuments().exec();
    const res = await request(app).get("/users").expect(200);
    
    expect(res.body.length).toEqual(countUsers);
  });
});