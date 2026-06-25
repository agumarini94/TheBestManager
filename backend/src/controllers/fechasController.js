import pool from '../db/connection.js';
//!ESTA ES LA LOGICA PARA CARGAR LAS FECHAS JUGADAS     
const fechaJugada = async (req, res) => {
    try {
        const { estadoFecha } = req.body;
        const { fechaJugada } = req.body;
        const result = await pool.query('INSERT INTO fecha(fecha_jugada, estado_fecha) VALUES ($1, $2)', [fechaJugada, estadoFecha]);
        res.status(200).json({ message: 'Load Successfulled'}); 
        
    } catch (error) {
        res.status(500).json({ message: 'Not possible to charge the dates of the fecha' });
    }
}

export default fechaJugada; 
