import { useState } from "react";
import axios from 'axios'; //libreria para hacer peticiones al backend 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    //*1) Creo en estado local lo que el usuario escribe 
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //*2) uso Navigate para moverme entre las rutas 
    const navigate = useNavigate();

    //* 3) Ahora creo la funcion principal, que se ejecuta al hacer click en register. 
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            //* 4) Ahora envio los datos al end point que es donde se hace la conexion a la bd .
            const res = await axios.post('http://localhost:5006/api/register', { email, password, nombre }); 
            navigate('/login')
            
        } catch (error) {
            console.log('Not possible to register,check again');
            alert('!Error in the Register, check again' + error.response?.data?.error);
        }
    } //cierra el handleRegister
    
    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleRegister}>
                <h1 className="auth-title">Create your account</h1>
                <input className="auth-input" type='text' placeholder="Your name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input className="auth-input" type='email' placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="auth-input" type='password' placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-btn" type="submit">Register Now</button>
                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <a href="/login">Log in</a>
                </div>
            </form>
        </div>
    ); //cierra el return
} //cierra el register del principio

export default Register;
