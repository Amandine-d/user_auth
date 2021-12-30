// const User = require("../models/user");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const createNewUser = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  };
  await User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
    const user = new User({ email, password });
    user.save();
    return res.status(200).json( user );
    })
  .catch ((err) => {
    return res.status(500).json({ error: err })
  });

}

module.exports = {
  createNewUser,
}