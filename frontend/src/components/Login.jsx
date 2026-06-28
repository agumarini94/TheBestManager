import { useState } from "react"; //para manejar los datos del formulario, almacena lo que el usuario va escribiendo en el imput
import axios from 'axios'; //Libreria para hacer peticiones al backend
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../image/Logo1.png';
const Login = () => {
    //* 1) Creo un Estado local para guardar lo que el usuario escribe en el input 
    //email guarda el estado actual del estado, osea cuando empieza, esta vacio. Y useEmail lo va actualizando a medida que el usuario escribe. useState devuelve un array con el valor actual, y la funcion para actualizarlo. 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //*2) navigate, para moverme entre las rutas. es lo que veo en el buscador /login.
    const navigate = useNavigate();

    //*3) Ahora creo la funcion principal que contiene los datos del formulario. Se ejecuta al hacer click en Submit. 
    const handleSubmit = async (e) => { //! e contiene los datos del formulario que estoy enviando. 
        e.preventDefault(); //evita que el formulario se actualice.
        try {
            //ahora envio los datos al endpoint del backend, que es donde se hace el punto de entrada al servidor. 
            const res = await axios.post('http://localhost:5006/api/login', { email, password });

            //*4) Guardo el role y el token para futuras peticiones y saber que mostrar.
            const token = res.data.token;
            const rol = res.data.user.rol;
            localStorage.setItem('token', token);
            localStorage.setItem('role', rol);
            localStorage.setItem('name', res.data.user.nombre);

            //* 5) Hago el if para ver si es role user o admin 
            if (rol === 'user') {
                navigate('/miEquipoVirtual') //! Creo que esta mal esto 
            } else {
                navigate('/adminPanel') //! Aunque no tengo un role admin.
            }

        } catch (error) {
            console.log(error);
            alert('!Error in the login, check again' + error.response?.data?.error);
        }
    };

    return (
        //Aca va todo lo que el usuario va a ver en el front
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <img src={logo} className="auth-logo" alt="The Best Manager" />
                <h2 className="auth-title">Welcome to The Best Manager</h2>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-btn" type="submit">Log in</button>

                {/* BOTON DE REGISTRO: */}
                <div className="auth-footer">
                    <p>Are u not register ? </p>
                    <Link to='/register'>
                        Register Now !
                    </Link>
                </div>
                <p className="auth-demo">Demo: test@gmail.com / 123456</p>
            </form>
        </div>
    ); // Esto cierra el return 
} // Esto cierra el const Login del principio

export default Login; 


