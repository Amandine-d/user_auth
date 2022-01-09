const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = mongoose.model("User");

const createNewUser = async(req, res) => {
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
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        // if (err) { return res.status(500).json({ error: err }) }
        const user = new User({ email, password: hashedPassword });
        user.save();
        return res.status(201).json(user);
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err })
    });

}

const listUsers = async (req, res) => {
  try {
    // We don't need the _id and the __v properties. mongodb was returning them automatically.
    let users = await User.find({});
    users = users.map(filter => ({ email: filter.email, password: filter.password }))

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const comparePassword = (req, res, next) => {
  //Return 400 if parameters are invalid
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Incorrect email or password" });
  };

  //get User
  User.findOne({ email: email })
    // console.log('Adde .body.email', req.body.email)
    .then(existingUser => {
      //Return 400 if user does not exist
      if (!existingUser) {
        return res.status(400).json({ error: "Incorrect email or password" })
      }
      //Compare password
      bcrypt.compare(password, existingUser.password, function (err, result) {
        if (result == true) {
          res.locals.user = existingUser;
          return next();
        }
        res.status(400).json({ error: "Incorrect email or password" })

      })
    })
}

const getToken = async (req, res) => {
  const user = res.locals.user;
  const token = jwt.sign({ email: user.email }, process.env.SECRET);
  return res.status(200).json({ token: token });

}

module.exports = {
  createNewUser,
  listUsers,
  comparePassword,
  getToken,
}