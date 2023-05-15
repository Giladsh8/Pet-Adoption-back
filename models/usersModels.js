const dbConnection = require("../knex/knex");
const bcrypt = require("bcrypt");

async function getUsersListModal() {
  try {
    const usersListQuery = await dbConnection.from("users").select();
    return usersListQuery;
  } catch (err) {
    console.log(err);
  }
}

async function addUserModel(newUser) {
  try {
    const addedUser = await dbConnection.from("users").insert(newUser);
    return true;
  } catch (err) {
    console.log(err);
  }
}

const getUserByEmailModel = async (email) => {
  try {
    const users = await dbConnection
      .from("users")
      .where({ email: email })
      .first();
    return users;
  } catch (err) {
    console.log(err);
  }
};

const getUserDetailModal = async (userId) => {
  try {
    const userDetailQuery = await dbConnection
      .from("users")
      .where({ userId: userId.userId });

    return userDetailQuery;
  } catch (err) {
    console.log(err);
  }
};

const updateUserDetailsModal = async (det) => {
  try {
    const updatrUserQuery = await dbConnection
      .from("users")
      .where({ userId: det.userId })
      .update({
        email: det.email,
        password: det.password,
        firstName: det.firstName,
        lastName: det.lastName,
        phone: det.phone,
      });
  } catch (err) {
    console.log(first);
  }
};
module.exports = {
  addUserModel,
  getUserByEmailModel,
  getUsersListModal,
  getUserDetailModal,
  updateUserDetailsModal,
};
