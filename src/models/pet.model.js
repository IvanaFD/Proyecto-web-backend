const pool = require('../config/db');

const ALLOWED_SPECIES = ["Perro", "Gato", "Conejo", "Ave", "Reptil", "Otro"];

const getSpecies = () => ALLOWED_SPECIES;


const ALLOWED_SORT_COLUMNS = ["name", "age", "status"];

const getAllPets = async ({ search, species, sort = "name", order = "desc", page = 1, limit = 10 } = {}) => {
    const sortColumn = ALLOWED_SORT_COLUMNS.includes(sort) ? sort : "name";
    const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";
    const offset = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit));
    const limitVal = Math.max(1, Number(limit));

    const conditions = [];
    const filterParams = [];

    if (search) {
        filterParams.push(`%${search}%`);
        conditions.push(`(name ILIKE $${filterParams.length} OR species ILIKE $${filterParams.length})`);
    }

    if (species && ALLOWED_SPECIES.includes(species)) {
        filterParams.push(species);
        conditions.push(`species = $${filterParams.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const n = filterParams.length;

    const result = await pool.query(
        `SELECT * FROM pets ${where} ORDER BY ${sortColumn} ${sortOrder} LIMIT $${n + 1} OFFSET $${n + 2}`,
        [...filterParams, limitVal, offset]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM pets ${where}`, filterParams);

    return { data: result.rows, total: Number(count.rows[0].count) };
};

const getPetById = async (id) => {
    const result = await pool.query(`SELECT * FROM pets WHERE id = $1`, [id]);
    return result.rows[0];
};

const createPet = async ({name,species, breed, age, status, description, image_url}) => {
    const result = await pool.query(
        `INSERT INTO pets (name, species, breed, age, status, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, species, breed, age, status || 'Available', description, image_url]
    );
    return result.rows[0];

};

const updatePet = async (id, {name, species, breed, age, status, description, image_url}) => {
    const result = await pool.query(
        `UPDATE pets 
        SET name = $1, species = $2, breed = $3, age = $4, status = $5, description = $6, image_url = $7
        WHERE id = $8 
        RETURNING *`,
        [name, species, breed, age, status, description, image_url, id]
    );
    return result.rows[0];
};

const removePet = async (id) => {
    await pool.query(`DELETE FROM pets WHERE id = $1`, [id]);
};

module.exports = { getAllPets, getPetById, createPet, updatePet, removePet, getSpecies, ALLOWED_SPECIES };
