import React, { useState, useEffect } from 'react'; //useState para guardar temporalmente los datos de los jugadores, y useEffect para hacer el fetch
import axios from 'axios';
import Navbar from './Navbar.jsx';

const MiEquipoVirtual = () => {
    const [miEquipoVirtual, setMiEquipoVirtual] = useState([]);
    const token = localStorage.getItem('token'); //* Primero que nada obtengo el token para ver si el usuario esta autorizado a estar aca . 

    useEffect(() => { //cuando ingreso, se dispara el useEffect con todas las acciones 
        const fetchMiEquipoVirtual = async() => {
            try {
                const responseMiEquipoVirtual = await fetch('http://localhost:5006/api/miEquipoVirtual', {
                    headers: { Authorization: `Bearer ${token}` } //esto lo uso para enviar el token, la autorizacion a estar aca .
                });

                const data = await responseMiEquipoVirtual.json();
                setMiEquipoVirtual(data)
            }
            catch (error) {
                console.log(error);
                alert('Error getting your virtual team');
            }
        } //cierra el fetch mi equipo..
        fetchMiEquipoVirtual()
    }, [])
    
    //!ACA ESTA LA LOGICA PARA VENDER JUGADORES. 
    const venderJugadores = async (jugadorId) => { //esta funcion para vender jugadores
        try {
            //* Ahora accedo donde tengo el mercado de jugadores
            const res = await axios.delete('http://localhost:5006/api/mercadoJugadores', { //* Accedo al backend del mercaco
                data: { jugadorId }, //* Esto es lo que paso en el body, y es el id del jugador que quiero comprar. 
                headers: { Authorization: `Bearer ${token}` }  //* Esta es mi identificacion para entrar. Va en el header    
            })
            alert(res.data.message); //muestro la respuesta del backed 
            //* Aca ahora deberia poner la lista de los jugadores, sin el que acabo de vender. 
            setMiEquipoVirtual(miEquipoVirtual.filter((j) => j.id !== jugadorId));

        } catch (error) {
            alert(error.response?.data?.message || 'Not possible to sell players');
            //* los .? (se leen de derecha a izquierda) significan 'si esto existe, segui, si no, no rompas nada y devolve undefined. || signifca 'o' o entonces. 
        }
    }
    //* Para crear la cancha de futbol, necesito extraer la posicion de cada jugador. Arquero, defensores ... 
    const arqueros = miEquipoVirtual.filter((jugador) => jugador.posicion === 'Arquero');
    //Filter recorre el array miEquipoVirtual, y para cada jugador chequea si es arquero, y la guarda solo si coincide.
    const defensores = miEquipoVirtual.filter((jugador) => jugador.posicion === 'Defensor');
    const mediocampista = miEquipoVirtual.filter((jugador) => jugador.posicion === 'Mediocampista');
    const delantero = miEquipoVirtual.filter((jugador) => jugador.posicion === 'Delantero');


    return (
        <>
            <Navbar />
        <div className='cancha'>
                {/* ==================== EMPIEZA CAMBIO JSX CANCHA - CLAUDE ==================== */}
                {/* Div decorativo: circulo central de la cancha, sin logica */}
                <div className='field-circle'></div>
                {/* ==================== TERMINA CAMBIO JSX CANCHA - CLAUDE ==================== */}

                <div className='fila-arqueros'>
                    {arqueros.map((jugador) => (
                        //arqueros es el array que traje arriba (tiene 0 o 1 elemento)
                        //jugador es cada elemento individual de ese array, es decir cada jugador.
                        //map recorre el array y por cada jugador devuelve un <div>
                        <div key={jugador.id} className='jugador-cancha'>
                            {jugador.nombre}
                            <button onClick={() => venderJugadores(jugador.id)}> Sell</button> 
                        </div> 
                    ))} 
                </div> 
                {/* Ahora sigue el div para defensores */}
                <div className='fila-defensores'> 
                    {defensores.map((jugador) => (
                        <div key={jugador.id} className='jugador-cancha'>
                            {jugador.nombre}
                            <button onClick={() => venderJugadores(jugador.id)}> Sell</button> 
                        </div>
                    ))}
                </div>
                {/* Ahora sigue el div para los Mediocampistas  */}
                <div className='fila-mediocampistas'> 
                    {mediocampista.map((jugador) => (
                        <div key={jugador.id} className='jugador-cancha'>
                            {jugador.nombre}
                            <button onClick={() => venderJugadores(jugador.id)}> Sell</button> 
                        </div>
                    ))}
                </div>
                 {/* Ahora sigue el div para Delanteros */}
                <div className='fila-delanteros'> 
                    {delantero.map((jugador) => (
                        <div key={jugador.id} className='jugador-cancha'>
                            {jugador.nombre}
                            <button onClick={() => venderJugadores(jugador.id)}> Sell</button> 
                        </div>
                    ))}
                </div>
                {/* Abajo cierro el div que arranca todo */}
            </div> 
        </>
    ) // esto cierra el return 
} //esto cierra elmiequipovirtual de arriba de todo. 

export default MiEquipoVirtual;
