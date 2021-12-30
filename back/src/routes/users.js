const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register",
  userController.createNewUser,
);

router.get("/users", userController.listUsers,
);

module.exports = router;