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
    expect.assertions(2);
    //create new user to make sure there is at least one
    const newUser = new User(user);

    const countUsers = await User.countDocuments().exec();
    const res = await request(app).get("/users").expect(200);

    expect(res.body.length).toEqual(countUsers);

    // retrieve the first item
    let first = res.body[0];

    //toEqual(2) because we need only password and email
    expect(Object.keys(first).length).toEqual(2);

    //Delete user
    newUser.delete();

  });
});