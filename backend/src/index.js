import express from 'express'; 
import equiposRouter from './routes/equipos.js';
import jugadoresRouter from './routes/jugadores.js';
import miEquipoVirtualRouter from './routes/equipoVirtual.js';
import comprarJugador from './routes/mercado.js';
import register from './routes/register.js';
import login from './routes/login.js';
import fechaJugada from './routes/fechas.js';
import getPresupuesto from './routes/users.js';
import crearEstadisticas from './routes/estadisticas.js';
import crearPuntajes from './routes/puntajes.js';
import cors from 'cors'; 

const app = express();
const PORT = 5006;
app.use(cors());
app.use(express.json())

app.use('/api/equipos', equiposRouter)
app.use('/api/jugadores', jugadoresRouter)
app.use('/api/miEquipoVirtual', miEquipoVirtualRouter)
app.use('/api/mercadoJugadores', comprarJugador)
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/presupuesto', getPresupuesto)
app.use('/api/fechas', fechaJugada)
app.use('/api/estadisticas', crearEstadisticas)
app.use('/api/crearPuntajes', crearPuntajes)
app.listen(PORT, () => {
    console.log(`Conect in Port ${PORT}`)
})
