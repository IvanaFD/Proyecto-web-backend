const pool = require('../src/config/db');
const pets = [
    {
        name: "Luna",
        species: "Perro",
        breed: "Labrador",
        age: 2,
        status: "Available",
        description: "Muy juguetona y cariñosa, le encanta correr.",
        image_url: null,
    },
    {
        name: "Mochi",
        species: "Gato",
        breed: "Siamés",
        age: 4,
        status: "Available",
        description: "Tranquila y curiosa, perfecta para apartamentos.",
        image_url: null,
    },
    {
        name: "Rocky",
        species: "Perro",
        breed: "Bulldog",
        age: 3,
        status: "Adopted",
        description: "Muy leal, ya encontró hogar.",
        image_url: null,
    },
];

const seed = async () => {
    try {
        for (const pet of pets) {
            await pool.query(
                `INSERT INTO pets (name, species, breed, age, status, description, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [pet.name, pet.species, pet.breed, pet.age, pet.status, pet.description, pet.image_url]
            );
        }   
        console.log(" Datos de prueba insertados correctamente");
        } catch (err) {
            console.error(" Error al insertar datos:", err.message);
        } finally {
            await pool.end();
        }
};

seed();