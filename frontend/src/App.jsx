import React, { useState, useEffect } from 'react'; //useState para guardar temporalmente los datos de los jugadores, y useEffect para hacer el fetch
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

import Login from './components/Login.jsx'; //* traigo el login
import Jugadores from './components/Jugadores.jsx';
import MiEquipoVirtual from './components/MiEquipoVirtual.jsx';
import Register from './components/Register.jsx';
import AdminPanel from './components/AdminPanel.jsx';
function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/miEquipoVirtual' element={<MiEquipoVirtual />} />
        <Route path='/jugadores' element={<Jugadores />} />
        <Route path='/adminPanel' element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App; 
