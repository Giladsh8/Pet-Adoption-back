const express = require("express");
const petController = require("../controllers/petsController");
const { statusAuth } = require("../middl/petsMiddleware");

const petRouter = express.Router();

petRouter.put("/available", statusAuth, petController.changePetStatusAvailable);

petRouter.get("/usersPets/:userId", petController.getUsersPets);

petRouter.put("/:petId", petController.updatePet);

petRouter.get("/petsList", petController.getAllPets);

petRouter.get("/checkOwned/:petId", statusAuth, petController.chekIfPetOwned);

petRouter.get("/adopted", statusAuth, petController.getAdoptedList);

petRouter.get("/fosterd", statusAuth, petController.getFosterdList);

petRouter.get("/listliked", statusAuth, petController.getLikedPetList);

petRouter.post("/", petController.addPet);

petRouter.get("/", petController.addPetsList);

petRouter.put("/", statusAuth, petController.changePetStatus);

petRouter.get("/:petId", petController.findPet);

petRouter.post("/likedPets", statusAuth, petController.addLikedPets);

petRouter.delete("/likedPets/:petId", statusAuth, petController.deletLikedPets);

petRouter.get("/likedPets/:petId", statusAuth, petController.checkIfLiked);

petRouter.post("/activities", statusAuth, petController.addToActivities);

module.exports = petRouter;
