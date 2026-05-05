const express = require("express");
const router = express.Router();
const { getAllPets, getPetById, createPet, updatePet, removePet, getSpecies } = require("../controllers/pet.controller");
const upload = require("../middleware/upload");

router.get("/species", getSpecies);
router.get("/", getAllPets);
router.get("/:id", getPetById);
router.post("/", upload.single("image"), createPet);
router.put("/:id", upload.single("image"), updatePet);
router.delete("/:id", removePet);

module.exports = router;
