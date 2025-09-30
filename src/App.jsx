import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Splash from './components/Splash'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Device from './pages/Device'
import Offline from './pages/Offline'


export default function App(){
return (
<>
<Splash />
<header>
<div className="container nav">
<strong>Yucadiax PWA</strong>
<NavLink to="/" end>Home</NavLink>
<NavLink to="/tasks">Tareas (CSR)</NavLink>
<NavLink to="/ssg">Acerca (SSG)</NavLink>
<NavLink to="/device">Dispositivo</NavLink>
<NavLink to="/offline">Offline</NavLink>
</div>
</header>
<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/tasks" element={<Tasks />} />

<Route path="/ssg" element={<div className="card"><h2>Acerca (SSG)</h2><p>Esta vista está pre-renderizada a HTML en build (SSG). Al navegar por SPA verás este contenido equivalente.</p><p>Prueba abrir directamente <code>/ssg/</code> tras el build para ver el HTML generado sin JavaScript.</p></div>} />
<Route path="/device" element={<Device />} />
<Route path="/offline" element={<Offline />} />
</Routes>
</main>
<footer>
<div className="container">© {new Date().getFullYear()} Yucadiax PWA — Demo</div>
</footer>
</>
)
}