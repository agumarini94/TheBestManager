import pool from '../db/connection.js';

const getMiEquipo = async (req, res) => {
    try { 
        const userId = req.user.userId; //obtengo el id del usuario. 
        const result = await pool.query(
            `SELECT jugador.nombre, jugador.posicion, jugador.precio, jugador.id, equipo_virtual.nombre AS nombre_equipo
            FROM transferencia
            JOIN jugador ON transferencia.id_jugador = jugador.id
            JOIN equipo_virtual ON equipo_virtual.id_user = transferencia.id_user
            WHERE transferencia.id_user = $1`, [userId]) ; //el userId es el id que estoy enviando 
            //*Explicado: 1) selecciono el nombre, posicion y precio del jugador, de la tabla jugador, 2) donde transferencia, se une con la tabla jugador, a traves de id_jugador. (de transferencia.id_jugador = al id del jugador.id ) 3) WHERE donde en el user_id de la tabla transferencia, coincida con el del usuario que vino en el userId de arriba 


        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Not possible to get Mi Team' });
    }
}

export default getMiEquipo;
