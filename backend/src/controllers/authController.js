//! ACA ESTA LA FUNCION DE REGISTRO DE LOS USUARIOS 
import pool from '../db/connection.js' //el pool sirve para hacer la conexion con la bd. 
import bcrypt, { compare } from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10) //El 10 es el número de "rondas" de encriptación, más alto es más seguro pero más lento. 10 es el estándar.
        const result = await pool.query('INSERT INTO users(nombre, email, password, rol) VALUES ($1, $2, $3, $4)', [nombre, email, hashedPassword, 'user'])
        res.status(201).json({ message: 'User created successfulled' });
    }

    catch (error) {
        console.log(error)
        res.status(500).json(({ message: "Not possible to add Users, check again" }))
    }
}

//! ACA ESTA LA FUNCION PARA EL LOGIN 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]); //el $1 es de seguridad. 
        const user = result.rows[0]; //si encuentra el mail, entonces traigo ese usuario. 
        if (user && await bcrypt.compare(password , user.password)) {
            //si la contrasena coincide, la guardo en un token. 
            const token = jwt.sign({ userId: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '2h' });
            //Luego muestro el resultado obtenido. 
            res.json({
                message: 'Welcome! ',
                token,
                user: { id: user.id, username: user.nombre, rol: user.rol }
            });
        } else {
            res.status(401).json({ message: 'Some details are wrong, check again' });
            }
        }
    catch (error) {
        res.status(500).json(({ message: 'Not possible to login, try again' }));
    }
}
//! Con esta funcion obtengo el presupuesto de cada usuario. 
const getPresupuesto = async (req, res) => {
    const userId = req.user.userId; //obtengo el id del usuario. 
    try {
        const result = await pool.query('SELECT presupuesto FROM users WHERE id = $1', [userId])
        res.json({ presupuesto: result.rows[0].presupuesto })
    } catch (error) {
        res.status(500).json(({ message: 'Not possible to get the credit' }));
    }
}
export  {register, login, getPresupuesto }; 
