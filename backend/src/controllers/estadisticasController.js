import pool from "../db/connection.js";

const crearEstadisticas = async (req, res) => {
    try {
        const { idJugador, fechaJugada, goles, asistencias, amarillas, rojas, penales, valla_invicta, faltas, rendimiento } = req.body;
        const result = await pool.query('INSERT INTO estadistica(id_jugador, fecha_jugada, goles, asistencias, amarillas, rojas, penales, valla_invicta, faltas, rendimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [idJugador, fechaJugada, goles, asistencias, amarillas, rojas, penales, valla_invicta, faltas, rendimiento]);
        res.status(200).json({ message: 'Estadistics loaded successfulled' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Not possible to charge the estadistics'})
    }
}


const getMisEstadisticas = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await pool.query('SELECT jugador.nombre, estadistica.goles, estadistica.asistencias, estadistica.amarillas, estadistica.rojas, estadistica.penales, estadistica.valla_invicta, estadistica.faltas, estadistica.rendimiento, estadistica.fecha_jugada FROM transferencia JOIN jugador ON transferencia.id_jugador = jugador.id JOIN estadistica ON jugador.id = estadistica.id_jugador WHERE transferencia.id_user = $1', [userId]); 
        res.json(result.rows);

    } catch (error) {
        res.status(500).json({ message: 'Not possible to get the estadistics' });
    }
}
export {crearEstadisticas, getMisEstadisticas}; 