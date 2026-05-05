const pool = require('../config/db');

const getAllPets = async (search) => {

    if(search){
    const result = await pool.query(
        `SELECT * FROM pets WHERE name ILIKE $1 OR species ILIKE $1 ORDER BY created_at DESC`,
        [`%${search}%`]
        );
        return result.rows;
    }
    const result = await pool.query(`SELECT * FROM pets ORDER BY created_at DESC`);
    return result.rows;

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

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    removePet
};