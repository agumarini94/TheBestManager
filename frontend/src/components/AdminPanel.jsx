import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";

const AdminPanel = () => { //! Aca creo los formularios para cargar los puntajes. 
    const token = localStorage.getItem('token'); //obtengo el token del admin
    const [posicion, setPosicion] = useState('');
    const [evento, setEvento] = useState('');  //Inician con '' xq son valores de texto
    const [puntaje, setPuntaje] = useState('');

    // acá va la función para enviar los datos
    // acá va el return con el formulario

    //! -----* Aca empiezo la logica para cargar los datos e nla bd ***--- 

    const handleSubmitPuntajes = async (e) => {
        e.preventDefault();  // para evitar la carga de los datos

        try {
            //* Ahora envio los datos para hacer la conexion con la bd 
            const res = await axios.post('http://localhost:5006/api/crearPuntajes', { posicion, evento, puntaje }, { headers: { Authorization: `Bearer ${token}` } });
            
            alert(res.data.message);

        } catch (error) {
            console.log(error);
            alert('Not possible to charge the puntations');
        }
}

    
    return (
        <div>
            <Navbar />
            <h2> Admin Admin </h2>
            <form onSubmit={handleSubmitPuntajes}>
                <select value={posicion} onChange={(e) => setPosicion(e.target.value)}>
                    <option value=""> Select Position </option>
                    <option value="Arquero"> Goal Keaper </option>
                    <option value="Defensa"> Defense </option>
                    <option value="Mediocampista"> Mediocampist </option>
                    <option value="Delantero"> Atack </option>
                </select>
                {/* Aca va el select para evento */}
                <select value={evento} onChange={(e) => setEvento(e.target.value)}>
                    <option value=""> Select Evento </option>
                    <option value="Save Penalty"> Penalty Saved </option>
                    <option value=" "> Defense </option>
                    <option value="gol">Goal</option>
                    <option value="asistencia">Assist</option>
                    <option value="amarilla">Yellow card</option>
                    <option value="roja">Red card</option>
                    <option value="valla_invicta">Clean sheet</option>
                    <option value="faltas">Foul</option>
                </select>
                {/* Ahora hago los select para los puntajes  */}
                <select value={puntaje} onChange={(e) => setPuntaje(e.target.value)}>
                    <option value=""> Select Puntaje </option>
                    <option value="-1"> -1 </option>
                    <option value="0"> 0 </option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                    <option value="7"> 7 </option>
                    <option value="8"> 8 </option>
                    <option value="9"> 9 </option>
                </select>
                <button onClick={handleSubmitPuntajes}>Save</button>
            </form>
            
        </div>
        // Aca va el front
    )
}


export default AdminPanel;
