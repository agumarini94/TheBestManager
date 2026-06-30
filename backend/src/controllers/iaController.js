//! CON ESTE CONTROLLER, HAGO QUE CLAUDE GENERE EL PROMPT PARA OBTENER LAS ESTADISTICAS, EN BASE A LOS JUGADORES QUE *YO* TENGO EN MI BD, SIN QUE ME TRAIGA JUGADORES QUE NO TENGO. 

import pool from "../db/connection.js";

const obtenerEstadisticas = async (req, res) => {
    const { equipoLocal, equipoVisitante, fechaJugada } = req.body; //* 1) Obtener los datos que queremos buscar.. 
    try {
        const result = await pool.query('SELECT jugador.nombre FROM jugador JOIN equipo ON jugador.equipo_id = equipo.id WHERE equipo.nombre = $1 OR equipo.nombre = $2', [equipoLocal, equipoVisitante]) //* 2) traigo todos los jugadores del equipo que quiero buscar .
        const resultDatosJugador = result.rows[0];
        const nombresJugadores = result.rows.map((j) => j.nombre) //* 3) Obtengo solo los nombres, para contruir el prompt
        //*---->  4) Ahora construyo el prompt para claude  <------* 
        const prompt = `Eres un experto en estadísticas de fútbol.
Dame las estadísticas del partido ${equipoLocal} vs ${equipoVisitante} de la temporada 2025/2026.

IMPORTANTE: Solo devuelve estadísticas de estos jugadores exactos:
${nombresJugadores.join(', ')}

Devuelve ÚNICAMENTE este JSON sin texto adicional, sin markdown, sin backticks:
{
  "jugadores": [
    { 
      "nombre": "nombre exacto del jugador",
      "goles": 0,
      "asistencias": 0,
      "amarillas": 0,
      "rojas": 0,
      "penales": 0,
      "valla_invicta": false,
      "faltas": 0,
      "rendimiento": 7.0
    }
  ]
}`
        //* ---- aca termina de contruir el prompt. <--------0* 

        //! ----> Ahora viene la parte que llamo a la api de claude, ----** 
        //* 3) Llamo a la API de Claude para que genere las estadisticas
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST', //* Metodo POST xq estoy enviando datos (el prompt)
            headers: {
                'Content-Type': 'application/json', //* Le digo que mando JSON
                'x-api-key': process.env.ANTHROPIC_API_KEY, //* Mi clave de Anthropic del .env
                'anthropic-version': '2023-06-01' //* Version de la API que uso
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-6', //* El modelo de Claude que uso
                max_tokens: 1000, //* Maximo de tokens que puede devolver
                messages: [{ role: 'user', content: prompt }] //* El prompt que construi antes
            })
        })
        //* 4) Convierto la respuesta a JSON y extraigo el texto
        const data = await response.json()
        console.log(data) // ver qué devolvió Claude
        const texto = data.content[0].text //* Claude devuelve el texto dentro de content[0].text   
        //* 5) Parseo el JSON que devolvio Claude para poder usarlo como objeto JavaScript
        const estadisticas = JSON.parse(texto)
        //* En este punto, estadisticas.jugadores es un array con cada jugador y sus datos
    
        //* 6) Ahora inserto la estadistica a cada jugador. 
        for (const jugador of estadisticas.jugadores) {
            // jugador tiene: nombre, goles, asistencias, amarillas, etc.

            // Primero busco el id del jugador en mi BD por nombre
            const jugadorEnBD = await pool.query(
                'SELECT id FROM jugador WHERE nombre = $1',
                [jugador.nombre]
            )

            if (jugadorEnBD.rows.length > 0) {
                const idJugador = jugadorEnBD.rows[0].id

                // Luego inserto las estadisticas
                await pool.query(
                    'INSERT INTO estadistica(id_jugador, fecha_jugada, goles, asistencias, amarillas, rojas, penales, valla_invicta, faltas, rendimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                    [idJugador, fechaJugada, jugador.goles, jugador.asistencias, jugador.amarillas, jugador.rojas, jugador.penales, jugador.valla_invicta, jugador.faltas, jugador.rendimiento]
                )
            }
        }
        res.status(200).json({ message: 'Statistics loaded successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Not possible to load statistics' })
    }
}



export default obtenerEstadisticas;