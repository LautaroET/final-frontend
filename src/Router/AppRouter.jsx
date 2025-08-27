import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Refugios from '../pages/Refugio';
import RefugioDetail from '../pages/RefugioDetail';
import RefugioCreate from '../pages/RefugioCreate';
import RefugioEdit from '../pages/RefugioEdit';
import NotFound from '../pages/NotFound';
import Mascotas from '../pages/Mascota';
import MascotaDetail from '../pages/MascotaDetail';
import MascotaCreate from '../pages/MascotaCreate';
import MascotaEdit from '../pages/MascotaEdit';
import Authentication from '../pages/Authentication';
import Registrarse from '../pages/Registrarse';
import IniciarSesion from '../pages/IniciarSesion'; 
import Perfil from '../pages/Perfil'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/refugios" element={<Refugios />} />
      <Route path="/refugios/nuevo" element={<RefugioCreate />} />
      <Route path="/refugios/:id" element={<RefugioDetail />} />
      <Route path="/refugios/:id/editar" element={<RefugioEdit />} />
      <Route path="/mascotas" element={<Mascotas />} />
      <Route path="/mascotas/nuevo" element={<MascotaCreate />} />
      <Route path="/mascotas/:id" element={<MascotaDetail />} />
      <Route path="/mascotas/:id/editar" element={<MascotaEdit />} />
      <Route path="/auth" element={<Authentication />}>
        <Route path="iniciar" element={<IniciarSesion />} />
        <Route path="registrarse" element={<Registrarse />} />
      </Route>
      <Route path="/perfil" element={<Perfil/>} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;