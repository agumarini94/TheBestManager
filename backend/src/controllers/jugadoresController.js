import pool from '../db/connection.js';

const getJugador = async(req, res)=> {
    try {
        const result = await pool.query('SELECT equipo.nombre AS name_team, jugador.nombre AS name_player, jugador.precio AS jugador_precio, jugador.posicion AS jugador_posicion, jugador.id FROM equipo JOIN jugador ON equipo.id = jugador.equipo_id')
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Not possible to get the teams' });
    }
}

export default getJugador; 
