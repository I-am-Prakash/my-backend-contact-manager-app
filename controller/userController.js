const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Registering user
//@route POST api/contacts/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory for registration");
  }
  const userAvailable = await User.findOne({ email });
  console.log("User already exist :", userAvailable);

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exist");
  }

  //hash Password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, email, password: hashPassword });
  // console.log(`user resgistration page`);
  if (user) {
    res.status(201).json({
      message: `user Registered successfully`,
      ID: user._id,
      Email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User Data is not Valid");
  }
});

//@desc login user
//@route POST api/contacts/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory for registration");
  }
  const user = await User.findOne({ email });
  console.log("User already exist :", user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    // console.log(`User successfully Authenticated ${user}`);
    // res.json({user});

    //generate JWT Token
    const accessToken = jwt.sign(
      { user: { userID: user.id, userName: user.userName, email: user.email } },
      process.env.SECRET_STRING,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Password or email are invalid");
  }
  // console.log(`user Login page`);
});

//@desc current user info
//@route GET api/contacts/user/currentUser
//@access private
const currentUserInfo = asyncHandler((req, res) => {
  // console.log(`User information`);
  console.log(`user called me ${req.user}`)
  res.status(200);
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };
