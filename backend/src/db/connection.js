import 'dotenv/config'; // carga las credenciales de .env para que puedan ser leidas
import pg from 'pg'; 

const { Pool } = pg; //extrae la clase pool de la libreria pg
const pool = new Pool({//crea una nueva instancia de pool para la conexion con la bd 
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Obligatorio para Neon
    },
})


export default pool; 
