const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register",
  userController.createNewUser,
);

router.get("/users", userController.listUsers,
);

router.post("/login", userController.comparePassword, userController.getToken,
);

module.exports = router;