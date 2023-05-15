const { getUserByEmailModel } = require("../models/usersModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkPassword = (req, res, next) => {
  const { password, rePassword } = req.body;
  if (password !== rePassword) {
    res.status(400).send("Password dont match");
    return;
  }
  next();
};

const isUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  next();
};

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    req.body.password = hash;
    next();
  });
};

const loginIsUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send("No user with this email");
    return;
  }
  req.body.user = user;
  next();
};

const auth = (req, res, next) => {
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

const checkAdmin = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send(err);
    } else if (!decoded.admin) {
      res.status(401).send("Unauthorized");
    } else if (decoded.admin) {
      next();
    }
  });
};

module.exports = {
  checkPassword,
  isUserExist,
  hashPassword,
  loginIsUserExist,
  auth,
  checkAdmin,
};
