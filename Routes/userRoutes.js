const express = require("express");
const userController = require("../controllers/userController");
const { checkAdmin } = require("../middl/usersMiddleware");

const {
  checkPassword,
  isUserExist,
  hashPassword,
  loginIsUserExist,
  auth,
} = require("../middl/usersMiddleware");

const userRouter = express.Router();

userRouter.put(
  "/update/:userId",
  checkPassword,
  hashPassword,
  userController.updateUserDetails
);

userRouter.get("/userDetail", auth, userController.getUserDetail);

userRouter.post(
  "/signup",
  checkPassword,
  isUserExist,
  hashPassword,
  userController.addUser
);

userRouter.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("cookie clered");
});

userRouter.post("/login", loginIsUserExist, userController.loginUser);

userRouter.get("/tokenCheck", userController.checkToken);

userRouter.get("/usersList", checkAdmin, userController.getUsersList);

module.exports = userRouter;

//
