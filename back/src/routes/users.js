const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register",
  userController.createNewUser,
);

module.exports = router;