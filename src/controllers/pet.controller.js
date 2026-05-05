const petModel = require("../models/pet.model");

const getSpecies = (req, res) => {
  res.status(200).json(petModel.getSpecies());
};


const getAllPets = async (req, res) => {
  try {
    const { q, sort, order, page, limit } = req.query;
    const result = await petModel.getAllPets({ search: q, sort, order, page, limit });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await petModel.getPetById(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, species, breed, age, status, description } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    if (!species) return res.status(400).json({ error: "species is required" });
    if (!petModel.ALLOWED_SPECIES.includes(species)) {
      return res.status(400).json({ error: `Especie inválida. Opciones: ${petModel.ALLOWED_SPECIES.join(", ")}` });
    }
    if (age !== undefined && isNaN(Number(age))) {
      return res.status(400).json({ error: "age must be a number" });
    }

    const image_url = req.file ? req.file.path : null;
    const pet = await petModel.createPet({ name, species, breed, age, status, description, image_url });
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const { name, species, breed, age, status, description } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    if (!species) return res.status(400).json({ error: "species is required" });
    if (!petModel.ALLOWED_SPECIES.includes(species)) {
      return res.status(400).json({ error: `Especie inválida. Opciones: ${petModel.ALLOWED_SPECIES.join(", ")}` });
    }
    if (age !== undefined && isNaN(Number(age))) {
      return res.status(400).json({ error: "age must be a number" });
    }

    const existing = await petModel.getPetById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Pet not found" });

    const image_url = req.file ? req.file.path : existing.image_url;
    const pet = await petModel.updatePet(req.params.id, { name, species, breed, age, status, description, image_url });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removePet = async (req, res) => {
  try {
    const existing = await petModel.getPetById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Pet not found" });
    await petModel.removePet(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPets, getPetById, createPet, updatePet, removePet, getSpecies };
