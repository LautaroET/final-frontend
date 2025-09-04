// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home';
import Refugios from '../pages/Refugio';
import RefugioDetail from '../pages/RefugioDetail';
import NotFound from '../pages/NotFound';
import Mascotas from '../pages/Mascota';
import MascotaDetail from '../pages/MascotaDetail';
import Authentication from '../pages/Authentication';
import IniciarSesion from '../pages/IniciarSesion';
import Registrarse from '../pages/Registrarse';
import UserProfile from '../pages/UserProfile';

function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/refugios" element={<Refugios />} />
      <Route path="/refugios/:id" element={<RefugioDetail />} />
      <Route path="/mascotas" element={<Mascotas />} />
      <Route path="/mascotas/:id" element={<MascotaDetail />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/login" element={<IniciarSesion />} />
      <Route path="/registro" element={<Registrarse />} />
        <Route path='/perfil' element={<UserProfile/>}/>

      {/* Dashboard protegido */}
      <Route element={<ProtectedRoute />}>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;