import pool from '../db/connection.js';

const getEquipo = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM equipo')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error conecting with the server' });
    }
}
    
export default getEquipo; 