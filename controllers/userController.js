const bcrypt = require("bcrypt");
const {
  addUserModel,
  getUsersListModal,
  getUserDetailModal,
  updateUserDetailsModal,
} = require("../models/usersModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send(err);
    } else if (!token) {
      res.status(401).send("Unauthorized");
    } else {
      res.send(decoded);
    }
  });
};

const getUsersList = async (req, res) => {
  try {
    const usersList = await getUsersListModal();
    res.send(usersList);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addUser = async (req, res) => {
  const { email, password, firstName, lastName, phone, admin } = req.body;
  try {
    const newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      admin: admin,
    };
    const user = await addUserModel(newUser);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const loginUser = (req, res) => {
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send("Password does not match");
      } else {
        const token = jwt.sign(
          {
            id: user.userId,
            name: user.firstName + " " + user.lastName,
            admin: user.admin,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token", token, { maxAge: 860000000, httpOnly: true });
        res.send({
          ok: true,
          name: `${user.firstName} ${user.lastName}`,
          admin: user.admin,
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserDetail = async (req, res) => {
  try {
    const userDetail = await getUserDetailModal(req.body);
    res.send(userDetail);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUserDetails = async (req, res) => {
  req.body.userId = req.params.userId;
  const { userId, email, password, firstName, lastName, phone } = req.body;
  try {
    editUser = {
      userId: userId,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };
    const UpdatedUser = await updateUserDetailsModal(editUser);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  addUser,
  loginUser,
  checkToken,
  getUsersList,
  getUserDetail,
  updateUserDetails,
};
