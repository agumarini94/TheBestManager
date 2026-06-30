import React, { useState, useEffect } from 'react'; //useState para guardar temporalmente los datos de los jugadores, y useEffect para hacer el fetch
import axios from 'axios';
import Navbar from './Navbar.jsx';

const Jugadores = () => { //Esto me trae el listado de los jugadores 
    const token = localStorage.getItem('token'); //* Primero que nada obtengo el token para ver si el usuario esta autorizado a estar aca . 
    const [jugadores, setJugadores] = useState([]);
    const [miEquipo, setMiEquipo] = useState([]); //* Esto es para chequear los jugadores que ya compre. 
    const [presupuesto, setPresupuesto] = useState([0]); //* Esto es para obtener mi presupuesto. 
    //! Esto es para hacer el carrusel de equipos.
    const equiposUnicos = [...new Set(jugadores.map((j) => j.name_team))]
    const [equipoActivo, setEquipoActivo] = useState(0)
    //! Agrego unos useState para ordenar los jugadores por equipo ,precio y posicion.

    const [filtroPosicion, setFiltroPosicion] = useState('')
    const [ordenPrecio, setOrdenPrecio] = useState('asc')
    useEffect(() => {
        const fetchMiEquipoVirtual = async () => {
        try {
            const responseMiEquipoVirtual = await fetch('http://localhost:5006/api/miEquipoVirtual', {
                headers: { Authorization: `Bearer ${token}` } //esto lo uso para enviar el token, la autorizacion a estar aca .
            });

            const data = await responseMiEquipoVirtual.json();
            setMiEquipo(data)
        }
        catch (error) {
            console.log(error);
            alert('Error getting your virtual team');
        }
        } //cierra el fetch mi equipo..
        fetchMiEquipoVirtual()
    }, [])

    
    useEffect(() => {
        const fetchJugadores = async () => {

            try {
                const responseJugadores = await fetch('http://localhost:5006/api/jugadores');
                const data = await responseJugadores.json();
                setJugadores(data);

            }
            catch (error) {
                console.error(`Error getting the players ${error}`);
            }
        }
        fetchJugadores()
    }, []) //EL [] FINAL LE DICE QUE SOLO EJECUTE UNA VEZ CUANDO CARGA EL COMPONENTE. 
    //! Aca empiezo la funcion que es para comprar jugadores 
    const comprarJugadores = async(jugadorId) => { //esta funcion para comprar jugadores
        try {
            //* Ahora accedo donde tengo el mercado de jugadores
            const res = await axios.post('http://localhost:5006/api/mercadoJugadores', //* Accedo al backend del mercaco
                { jugadorId }, //* Esto es lo que paso en el body, y es el id del jugador que quiero comprar. 
                { headers: {Authorization: `Bearer ${token}`} } //* Esta es mi identificacion para entrar. Va en el header
            )
            alert(res.data.message); //muestro la respuesta del backed 
            getPresupuesto();

        } catch (error) {
            alert(error.response?.data?.message || 'Not possible to buy players');
            //* los .? (se leen de derecha a izquierda) significan 'si esto existe, segui, si no, no rompas nada y devolve undefined. || signifca 'o' o entonces. 
        }
    
    }
    const jugadoresFiltrados = jugadores
        .filter((j) => j.name_team === equiposUnicos[equipoActivo])
        .filter((j) => filtroPosicion ? j.jugador_posicion === filtroPosicion : true)
        .sort((a, b) => ordenPrecio === 'asc' ? a.jugador_precio - b.jugador_precio : b.jugador_precio - a.jugador_precio)
    console.log(equiposUnicos)
    
    //! ACA HAGO EL USE EFFECT PARA OBTENER EL PRESUPUESTO DE CADA USUARIO ! 
    const getPresupuesto = async () => {
   
            try {
                const res = await axios.get('http://localhost:5006/api/presupuesto', { headers: { Authorization: `Bearer ${token}` } });
                setPresupuesto(res.data.presupuesto) //* 1) Guardo el presupuesto que traje del backend
                
            } catch (error) {
                alert('Not possible to get the credit');
            } 
    }
    useEffect(() => {
        getPresupuesto() //* 2) Llamo a la funcion para que se ejecute.
    }, []); //* 3) Solo se ejecuta una vez, sin el [] se repetiria. 


    return (
        <> <Navbar />
            <p className='presupuesto'>Credit available: {presupuesto}</p>
            {/* ACA AGREGO EL CARRUSEL PARA LOS EQUIPOS */}
            <div className="carrusel-equipos">
                <button onClick={() => setEquipoActivo(prev => prev === 0 ? equiposUnicos.length - 1 : prev - 1)}>←</button>
                <h2>{equiposUnicos[equipoActivo]}</h2>
                <button onClick={() => setEquipoActivo(prev => prev === equiposUnicos.length - 1 ? 0 : prev + 1)}>→</button>
            </div>

        <div className="jugadores-tabla">

                
                <div className="filtros">

                    <select value={filtroPosicion} onChange={(e) => setFiltroPosicion(e.target.value)}>
                        <option value="">All positions</option>
                        <option value="Arquero">Goalkeeper</option>
                        <option value="Defensor">Defender</option>
                        <option value="Mediocampista">Midfielder</option>
                        <option value="Delantero">Forward</option>
                    </select>

                    <select value={ordenPrecio} onChange={(e) => setOrdenPrecio(e.target.value)}>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                

            {/* Fila de encabezados de columna — solo visual, sin lógica */}
            <div className="jugador-card jugador-header">
                <span className="dato">Player</span>
                <span className="dato">Position</span>
                <span className="dato">Price</span>
                <span className="dato">Team</span>
                <span></span>
            </div>
                {jugadoresFiltrados.map((ListaJugadores) => (
                //jugadores es el array con todos los jugadores que traje de la bd.
                //ListaJugadores es el nombre de cada elemento individual.
                //.map() recorre el array
                //En la primera vuelta vale (name_player ? "Benedeto" y en la segunda vale namePlayer : Rojo...)
                <div key={ListaJugadores.id} className='jugador-card'>
                    <span className="dato">{ListaJugadores.name_player}</span>
                    <span className="dato">{ListaJugadores.jugador_posicion}</span>
                    <span className="dato">{ListaJugadores.jugador_precio}</span>
                    <span className='dato'>{ListaJugadores.name_team}</span>
                    <button className="jugador-btn"
                        disabled={miEquipo.some((j) => j.id === ListaJugadores.id)}
                        onClick={() => comprarJugadores(ListaJugadores.id)}>
                        {miEquipo.some((j) => j.id === ListaJugadores.id) ? 'Bought' : 'Buy'}
                        </button>
                </div>
            ))}
            </div>
        </>
    ) // Esto cierra el return
} //esto cierra el const Jugadores del principio

export default Jugadores ;
