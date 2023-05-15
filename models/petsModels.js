const { JSONCookie } = require("cookie-parser");
const { json } = require("express");
const dbConnection = require("../knex/knex");

async function changePetStatusModal(body) {
  try {
    const changeStatus = await dbConnection
      .from("pets")
      .where({ petId: body.petId })
      .update({ adoptionStatus: body.adoptionStatus, userId: body.userId });
    return;
  } catch (err) {
    console.log(err);
  }
}
async function changePetStatusAvailableModal(body) {
  console.log("ppppp");
  try {
    const changeStatus = await dbConnection
      .from("pets")
      .where({ petId: body.petId })
      .update({ adoptionStatus: body.adoptionStatus, userId: null });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    const addedPet = await dbConnection.from("pets").insert(newPet);

    return true;
  } catch (err) {
    console.log(err);
  }
}

async function addPetListModal() {
  try {
    const petsList = await dbConnection.from("pets").select();
    return petsList;
  } catch (err) {
    console.log(err);
  }
}

async function searchPetsListModel(loop) {
  try {
    const petsList = await dbConnection.from("pets").where((qb) => {
      if (loop.type) {
        qb.where({
          type: loop.type,
        });
      }
      if (loop.height) {
        switch (loop.height) {
          case "short":
            qb.whereBetween("height", ["15", "45"]);
            break;
          case "average":
            qb.whereBetween("height", ["46", "80"]);
            break;
          case "large":
            qb.whereBetween("height", ["81", "115"]);
            break;
        }
      }
      if (loop.weight) {
        switch (loop.weight) {
          case "small":
            qb.whereBetween("weight", ["2", "10"]);
            break;
          case "medium":
            qb.whereBetween("weight", ["11", "30"]);
            break;
          case "big":
            qb.whereBetween("weight", ["31", "100"]);
            break;
        }
      }
      if (loop.adoptionStatus) {
        qb.where({ adoptionStatus: loop.adoptionStatus });
      }
      if (loop.name) {
        qb.where({ name: loop.name });
      }
    });
    return petsList;
  } catch (err) {
    console.log(err);
  }
}

async function findPetModel(petId) {
  try {
    const searchedPet = await dbConnection.from("pets").where({ petId: petId });

    return searchedPet;
  } catch (err) {
    console.log(err);
  }
}

async function addLikedPetModal(like) {
  try {
    const likedPet = await dbConnection.from("likedPets").insert(like);
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function deletLikedPetsModal(deletePet) {
  try {
    const deletedPet = await dbConnection
      .from("likedPets")
      .where({ petId: deletePet.petId })
      .andWhere({ userId: deletePet.userId })
      .delete();
  } catch (err) {
    console.log(err);
  }
}

async function chekIfLikeModal(check) {
  try {
    const checkLike = await dbConnection
      .from("likedPets")
      .where({ petId: check.petId })
      .andWhere({ userId: check.userId });
    if (checkLike.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

async function chekIfPetOwnedModal(check) {
  try {
    const checkLike = await dbConnection
      .from("pets")
      .where({ petId: check.petId });
    // .andWhere({ userId: !null });
    if (checkLike[0].userId === null) {
      return true;
    } else if (checkLike[0].userId === check.userId) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getLikedPetListModal(id) {
  try {
    const likedListquery = await dbConnection
      .from("likedPets")
      .join("pets", "pets.petId", "=", "likedPets.petId")
      .where("likedPets.userId", "=", id.userId);
    return likedListquery;
  } catch (err) {
    console.log(err);
  }
}

async function getFostersListModal(id) {
  try {
    const fosterdListQuery = await dbConnection
      .from("pets")
      .where("pets.adoptionStatus", "=", "fosterd")
      .where("pets.userId", "=", id.userId);
    return fosterdListQuery;
  } catch (err) {
    console.log(err);
  }
}

async function getAdoptedListModal(id) {
  try {
    const adoptedListQuery = await dbConnection
      .from("pets")
      .where("pets.adoptionStatus", "=", "adopted")
      .where("pets.userId", "=", id.userId);
    return adoptedListQuery;
  } catch (err) {
    console.log(err);
  }
}

async function addToActivitiesModal(act) {
  try {
    await changePrevActivitiesModal(act);
    if (act.adoptionStatus === "Available") {
      return;
    }
    const addActQuery = await dbConnection
      .from("pet_activities")
      .insert(act, { active: "active" });
    return addActQuery;
  } catch (err) {
    console.log(err);
  }
}

async function changePrevActivitiesModal(act) {
  try {
    const changePrevActQuery = await dbConnection
      .from("pet_activities")
      .where({ petId: act.petId })
      .update({ active: "inactive" });
    if (changePrevActQuery) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

async function updatePetModal(up) {
  try {
    const updatedPet = await dbConnection
      .from("pets")
      .where({ petId: up.petId })
      .update({
        photo: up.photo,
        type: up.type,
        name: up.name,
        adoptionStatus: up.adoptionStatus,
        height: up.height,
        weight: up.weight,
        color: up.color,
        bio: up.bio,
        hypoallergenic: up.hypoallergenic || true,
        dietaryrRestrictions: up.dietaryrRestrictions,
        breed: up.breed,
      });
  } catch (err) {
    console.log(err);
  }
}

async function getUsersPetsModal(user) {
  try {
    const usersPetsQuery = await dbConnection
      .from("pet_activities")
      .where({ userId: user.userId });
    return usersPetsQuery;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addPetModel,
  searchPetsListModel,
  findPetModel,
  changePetStatusModal,
  addPetListModal,
  addLikedPetModal,
  deletLikedPetsModal,
  chekIfLikeModal,
  getLikedPetListModal,
  getFostersListModal,
  getAdoptedListModal,
  changePetStatusAvailableModal,
  chekIfPetOwnedModal,
  addToActivitiesModal,
  updatePetModal,
  getUsersPetsModal,
};
