import { Link, useNavigate } from "react-router-dom";
import logo from '../../image/Logo1.png';
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        //cuando apreto en 'exit' me lleva al login y borra el token
        navigate('/login');
    }

    return (
        <div className="navbar">
            <img src={logo} className="navbar-logo" alt="logo" />
            <Link to='/miEquipoVirtual'>My Team</Link>
            <Link to='/jugadores'>Players</Link>
            <button onClick={handleLogOut}>Exit</button>
        </div>
    )
}
export default Navbar; 