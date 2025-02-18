const express = require("express");
const {
  registerUser,
  loginUser,
  currentUserInfo,
} = require("../controller/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

// router.route("/getUsers").post(getUsers);

// router.use();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser", currentUserInfo);

module.exports = router;
