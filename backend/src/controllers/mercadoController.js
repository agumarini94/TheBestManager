import pool from '../db/connection.js';

//* ACA HAGO LA LOGICA PARA COMPRAR JUGADORES 
const comprarJugador = async (req, res) => {
    const userId = req.user.userId; //obtengo el id del usuario. 
    const { jugadorId } = req.body; //usa { } xq viene de varias cosas juntas, extraigo solo lo que necesito 
    try {
        const resultPresupuesto = await pool.query('SELECT presupuesto FROM users WHERE id = $1 ', [userId])
        const resultPrecioJugador = await pool.query('SELECT precio FROM jugador WHERE id = $1 ', [jugadorId])
        let presupuesto = resultPresupuesto.rows[0].presupuesto; //guardo un solo valor, el q necesito, en presupuesto 
        //! Aca uso let , xq luego presupuesto va a cambiar de valor al comprar un jugador. 
        const precioDelJugador = resultPrecioJugador.rows[0].precio; 
        //* Ahora hago la logica para que el usuario, si es q le alcanza, pueda comprar jugadores. 
        if (presupuesto > precioDelJugador) {
            //* Registro la transferencia 
            const transferenciaJugador = await pool.query('INSERT INTO transferencia(id_jugador, id_user, precio_pagado, fecha_compra) VALUES ($1, $2, $3, NOW())', [jugadorId, userId, precioDelJugador]);
            
            //* Ahora el paso siguiente es restar la transferencia.
            presupuesto = presupuesto - precioDelJugador;
            presupuesto = await pool.query('UPDATE users SET presupuesto = $1 WHERE id = $2  ', [presupuesto, userId]);
            //* Si la compra fue exitosa, le respondo al front que fue exitosa.
            res.status(200).json({ message: 'Perfect, you bought a new player to your team' });
        } else {
            res.status(501).json({ message: 'You dont have enoug money to buy' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Not possible to buy this player' });
    }
}

//* ACA HAGO LA LOGICA PARA VENDER JUGADOR. 
const venderJugador = async (req, res) => {
    const userId = req.user.userId; // obtengo el id del usuario 
    const { jugadorId } = req.body; //usa { } xq viene de varias cosas juntas, extraigo solo lo que necesito 
    try {
        const resultPresupuesto = await pool.query('SELECT presupuesto FROM users WHERE id = $1 ', [userId]); //* 1) Traigo el presupuesto del usuario 
        const resultPrecioJugador = await pool.query('SELECT precio FROM jugador WHERE id = $1 ', [jugadorId]); //* 2) Traigo el precio del jugador . 
        const precioDelJugador = resultPrecioJugador.rows[0].precio; 
        let presupuesto = resultPresupuesto.rows[0].presupuesto; //* 3) guardo el valor del presupuesto
        presupuesto = presupuesto + precioDelJugador;
        //* Actualizo el presupuesto con el nuevo tras la venta del jugador. 
        presupuesto = await pool.query('UPDATE users SET presupuesto = $1 WHERE id = $2  ', [presupuesto, userId]);
        const transferenciaJugador = await pool.query('DELETE FROM transferencia WHERE id_jugador = $1 AND id_user = $2', [jugadorId, userId]);

        res.status(200).json({ message: 'The player has been selled, now you have more credit' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Not possible to sell this player' });
    }
}
export {comprarJugador, venderJugador };