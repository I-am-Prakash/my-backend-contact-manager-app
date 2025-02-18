const jwt = require("jsonwebtoken");
const asynchHandler = require("express-async-handler");

const validateToken = asynchHandler((req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("authHeader", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_STRING, (error, decoded) => {
      if (error) {
        res.status(401);
        throw new Error(
          `Invalid JWT Token || User is not Authorized and Error: ${error}`
        );
      }
      console.log("user verified");
      console.log(decoded);
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("Authorization Invalid");
  }
});

module.exports = validateToken;
