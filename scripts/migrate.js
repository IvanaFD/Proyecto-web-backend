const pool = require('../src/config/db');


const createTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS pets (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(100) NOT NULL,
        species     VARCHAR(50)  NOT NULL,
        breed       VARCHAR(100),
        age         INTEGER,
        status      VARCHAR(50)  DEFAULT 'Available',
        description TEXT,
        image_url   TEXT,
        created_at  TIMESTAMP    DEFAULT NOW()
        );
    `;

    try{
        await pool.query(query);
        console.log('Tabla "pets" creada o ya existe.');

    }catch(error){
        console.error('Error al crear la tabla "pets":', error.message);

    }finally{
        await pool.end();
    }
};

createTable();