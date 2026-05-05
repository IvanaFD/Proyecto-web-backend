const pool = require('../src/config/db');

const pets = [
  { name: "Lila",     species: "Perro",   breed: "Shih Tzu",         age: 2, status: "Available", description: "Muy juguetona y cariñosa, le encanta correr en el parque y jugar con niños.",           image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016126/lila_a4wbrn.jpg" },
  { name: "Lola",     species: "Gato",    breed: "Doméstico",        age: 4, status: "Available", description: "Tranquila y curiosa, perfecta para apartamentos. Le encanta asomarse por la ventana.", image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016127/lola_kniv2t.jpg" },
  { name: "Rocky",    species: "Perro",   breed: "Bulldog Francés",  age: 3, status: "Adopted",   description: "Muy leal y protector, ya encontró su hogar ideal.",                                    image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016127/Rocky_ms9pjv.avif" },
  { name: "Pistacho", species: "Conejo",  breed: "Holland Lop",      age: 1, status: "Available", description: "Pequeño y adorable, ama los vegetales y explorar espacios nuevos.",                    image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016129/Pistacho_pey4gt.jpg" },
  { name: "Kiwi",     species: "Ave",     breed: "Periquito",        age: 2, status: "Available", description: "Muy sociable y parlanchín, aprende palabras rápido y le encanta la música.",           image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016127/Kiwi_ojvqn8.jpg" },
  { name: "Max",      species: "Perro",   breed: "Golden Retriever", age: 5, status: "Available", description: "Calmado y gentil, ideal para familias con niños pequeños.",                           image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016127/Max_hbm85t.jpg" },
  { name: "Spike",    species: "Reptil",  breed: "Dragón Barbudo",   age: 2, status: "Available", description: "Dócil y fácil de manejar, perfecto para quienes quieren una mascota diferente.",      image_url: "https://res.cloudinary.com/dajf4aqhf/image/upload/v1778016126/spike_wyysjo.jpg" },
];

const seed = async () => {
    try {
      await pool.query(`TRUNCATE TABLE pets RESTART IDENTITY`);
      for (const pet of pets) {
        await pool.query(
          `INSERT INTO pets (name, species, breed, age, status, description, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [pet.name, pet.species, pet.breed, pet.age, pet.status, pet.description, pet.image_url]
        );
      }
      console.log(` ${pets.length} mascotas insertadas correctamente`);
    } catch (err) {
      console.error(" Error al insertar datos:", err.message);
    } finally {
      await pool.end();
    }
};

seed();