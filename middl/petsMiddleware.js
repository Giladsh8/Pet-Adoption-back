const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const statusAuth = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send(err);
    } else if (!decoded) {
      res.status(401).send("Unauthorized");
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
};

module.exports = { statusAuth };
