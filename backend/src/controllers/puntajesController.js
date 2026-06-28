import pool from "../db/connection.js"; //para conectar a la bd 

//!ESTA ES LA LOGICA PARA CREAR LOS PUNTAJES DE CADA COSA, EN EL PANEL DEL ADMIN

const crearPuntajes = async(req,res) => {
    try {
        const { posicion, evento, puntaje } = req.body; //* 1) obtengo los eventos del body
        const result = await pool.query('INSERT INTO Puntajes(posicion, evento, puntos) VALUES ($1, $2, $3)', [posicion, evento, puntaje]);
        res.status(200).json({ message: 'Puntage loaded successfulled' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Not possible to charge the puntage' });
    }
    
}

const getPuntajes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Puntajes');
        res.json(result.rows);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Not possible to load the puntations' });
    }
}
export { crearPuntajes, getPuntajes }; 
