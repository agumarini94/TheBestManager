import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import { useEffect } from "react";

const AdminPanel = () => { //! Aca creo los formularios para cargar los puntajes. 
    const token = localStorage.getItem('token'); //obtengo el token del admin
    const [posicion, setPosicion] = useState('');
    const [evento, setEvento] = useState('');  //Inician con '' xq son valores de texto
    const [puntaje, setPuntaje] = useState('');
    const [seccionActiva, setSeccionActiva] = useState(null) //* Para mostrar o no la funcion de cargar puntajes
    const [puntajesCreados, setPuntajesCreados] = useState([]); //[] xq va a guardar una lista de puntajes
    // acá va la función para enviar los datos
    // acá va el return con el formulario
    //! ----> ACA CREO LOS UseState PARA CARGAR LAS ESTADISTICAS DE LOS JUGADORES .
    const [idJugador, setIdJugador] = useState('')
    const [fechaJugada, setFechaJugada] = useState('')
    const [goles, setGoles] = useState(0)
    const [asistencias, setAsistencias] = useState(0)
    const [amarillas, setAmarillas] = useState(0)
    const [rojas, setRojas] = useState(0)
    const [penales, setPenales] = useState(0)
    const [vallaInvicta, setVallaInvicta] = useState(false)
    const [faltas, setFaltas] = useState(0)
    const [rendimiento, setRendimiento] = useState(0)
    const [nombreJugador, setNombreJugador] = useState('')
    const [jugadores, setJugadores] = useState([])



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
    const getPuntajes = async () => {
        try {
            const res = await axios.get('http://localhost:5006/api/crearPuntajes', { headers: { Authorization: `Bearer ${token}` } });
            setPuntajesCreados(res.data); //*Guardo los puntajes que traje de la bd 
        } catch (error) {
            alert('Not possible to show the puntations');
        }
    }
    useEffect(() => {
        getPuntajes()
    }, []);

    //! ----> ACA HAGO LA LOGICA PARA CARGAR LAS ESTADISTICAS. <----* 
    const handleSubmitEstadisticas = async (e) => {
        e.preventDefault(); //para que no se envie el formulario
        try {
            const res = await axios.post(
                'http://localhost:5006/api/estadisticas',
                {
                    idJugador,
                    fechaJugada,
                    goles,
                    asistencias,
                    amarillas,
                    rojas,
                    penales,
                    valla_invicta: vallaInvicta,
                    faltas,
                    rendimiento
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(res.data.message);
        } catch (error) {
            console.log(error);
            alert('Not possible to load the stats');
        }
    }

    const buscarJugador = (id) => {
        setIdJugador(id)
        const jugadorEncontrado = jugadores.find((j) => j.id === parseInt(id))
        if (jugadorEncontrado) {
            setNombreJugador(jugadorEncontrado.name_player)
        } else {
            setNombreJugador('')
        }
    }
    useEffect(() => {
        const fetchJugadores = async () => {
            const res = await axios.get('http://localhost:5006/api/jugadores')
            setJugadores(res.data)
        }
        fetchJugadores()
    }, [])

    return (
    <>
     <Navbar />
        <div className="admin-panel">
           
            <h2> Panel Admin </h2>
            <button onClick={() => setSeccionActiva('puntajes')} className="admin-btns">Create Scores</button>
            <button onClick={() => setSeccionActiva('estadisticas')} className="admin-btns">Load Statistics</button>

            {seccionActiva === 'puntajes' && (
            <form onSubmit={handleSubmitPuntajes}>
                <select value={posicion} onChange={(e) => setPosicion(e.target.value)}>
                    <option value=""> Select Position </option>
                    <option value="Arquero"> Goal Keaper </option>
                    <option value="Defensor"> Defense </option>
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
                )}
                    {/* ACA CREO LA LOGICA PARA CARGAR LAS ESTADISTICAS DE LOS JUGADORES */}
                {seccionActiva === 'estadisticas' && (
                    <form className="form-estadisticas" onSubmit={handleSubmitEstadisticas}>
                        <label>Player ID:</label>
                        <input type="number" placeholder="Player ID" value={idJugador} onChange={(e) => buscarJugador(e.target.value)} />
                        {nombreJugador && <p style={{ color: 'green', fontSize: '13px' }}>{nombreJugador}</p>}

                        <label>Date number</label>
                        <input type="number" placeholder="Date number" value={fechaJugada} onChange={(e) => setFechaJugada(e.target.value)} />
                        <label>Goals</label>
                        <input type="number" placeholder="Goals" value={goles} onChange={(e) => setGoles(e.target.value)} />
                        <label>Assists</label>
                        <input type="number" placeholder="Assists" value={asistencias} onChange={(e) => setAsistencias(e.target.value)} />
                        <label>Yellow cards</label>
                        <input type="number" placeholder="Yellow cards" value={amarillas} onChange={(e) => setAmarillas(e.target.value)} />
                        <label>Red cards</label>
                        <input type="number" placeholder="Red cards" value={rojas} onChange={(e) => setRojas(e.target.value)} />
                        <label>Penalties saved</label>
                        <input type="number" placeholder="Penalties saved" value={penales} onChange={(e) => setPenales(e.target.value)} />
                        <label>Valla invicted</label>
                        <input type="checkbox" className="checkbox-group" checked={vallaInvicta} onChange={(e) => setVallaInvicta(e.target.checked)} /> Clean sheet
                        <label>Fouls</label>
                        <input type="number" placeholder="Fouls" value={faltas} onChange={(e) => setFaltas(e.target.value)} />
                        <label>Performance</label>
                        <input type="number" placeholder="Performance (1-10)" value={rendimiento} onChange={(e) => setRendimiento(e.target.value)} />
                        <button type="submit">Save stats</button>
                    </form>
                )}
                 {/* ACA CREO LA TABLA PARA MOSTRAR LOS PUNTAJES QUE FUI CREANDO ---**  */}
                <table className="tabla-puntajes">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Event</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puntajesCreados.map((p) => (
                            <tr key={p.id}>
                                <td>{p.posicion}</td>
                                <td>{p.evento}</td>
                                <td>{p.puntos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </>
    )
}


export default AdminPanel;
