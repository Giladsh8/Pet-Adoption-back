const {
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
} = require("../models/petsModels");

const deletLikedPets = async (req, res) => {
  req.body.petId = req.params.petId;
  try {
    const deletLikedPets = await deletLikedPetsModal(req.body);
    res.send("deleted!");
  } catch (err) {
    res.status(500).send(err);
  }
};

const changePetStatus = async (req, res) => {
  try {
    const changedStatus = await changePetStatusModal(req.body);
    res.send(req.body.activity);
  } catch (err) {
    res.status(500).send(err);
  }
};

const changePetStatusAvailable = async (req, res) => {
  try {
    const changedStatus = await changePetStatusAvailableModal(req.body);
    res.send(req.body.activity);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPet = async (req, res) => {
  try {
    const newPet = await addPetModel(req.body);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPetsList = async (req, res) => {
  if (
    req.query.type === "" &&
    req.query.adoptionStatus === "" &&
    req.query.height === "" &&
    req.query.weight === "" &&
    req.query.name === ""
  ) {
    try {
      const petsList = await addPetListModal();
      res.send(petsList);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const searchPetsList = await searchPetsListModel(req.query);
      res.send(searchPetsList);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const findPet = async (req, res) => {
  try {
    const petId = req.params.petId;
    const searchedPet = await findPetModel(petId);
    res.send(searchedPet);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addLikedPets = async (req, res) => {
  try {
    const addedToLiked = await addLikedPetModal(req.body);
    res.send("added!");
  } catch (err) {
    res.status(500).send(err);
  }
};

const checkIfLiked = async (req, res) => {
  req.body.petId = req.params.petId;
  try {
    const checkLike = await chekIfLikeModal(req.body);
    res.send(checkLike);
  } catch (err) {
    res.status(500).send(err);
  }
};

const chekIfPetOwned = async (req, res) => {
  req.body.petId = req.params.petId;
  try {
    const checkOwend = await chekIfPetOwnedModal(req.body);
    res.send(checkOwend);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getLikedPetList = async (req, res) => {
  try {
    const likedList = await getLikedPetListModal(req.body);
    res.send(likedList);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFosterdList = async (req, res) => {
  try {
    const fosterdList = await getFostersListModal(req.body);
    res.send(fosterdList);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAdoptedList = async (req, res) => {
  try {
    const adoptedList = await getAdoptedListModal(req.body);
    res.send(adoptedList);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addToActivities = async (req, res) => {
  try {
    const addAct = addToActivitiesModal(req.body);
    res.send("Activity Added");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllPets = async (req, res) => {
  try {
    const allpetsList = await addPetListModal();
    res.send(allpetsList);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatePet = async (req, res) => {
  req.body.petId = req.params.petId;
  try {
    const update = await updatePetModal(req.body);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsersPets = async (req, res) => {
  try {
    const usersPets = await getUsersPetsModal(req.params);
    res.send(usersPets);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addPet,
  addPetsList,
  findPet,
  changePetStatus,
  addLikedPets,
  deletLikedPets,
  checkIfLiked,
  getLikedPetList,
  getFosterdList,
  getAdoptedList,
  changePetStatusAvailable,
  chekIfPetOwned,
  addToActivities,
  getAllPets,
  updatePet,
  getUsersPets,
};
