// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUser, loginUser } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id || decoded.sub,
          username: decoded.username,
          email: decoded.email,
          tipo: decoded.tipo || 'común',
          role: decoded.tipo || 'común',
        });
      } catch {
        sessionStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await loginUser({ email, password });
      const { token } = data;
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id || decoded.sub,
        username: decoded.username,
        email: decoded.email,
        tipo: decoded.tipo || 'común',
        role: decoded.tipo || 'común',
      });
      sessionStorage.setItem('token', token);
      return { success: true, message: 'Inicio de sesión exitoso' };
    } catch (error) {
      const message = error?.response?.data?.message || 'Credenciales incorrectas';
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await registerUser(userData);
      const { token } = data;
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id || decoded.sub,
        username: decoded.username,
        email: decoded.email,
        tipo: decoded.tipo || 'común',
        role: decoded.tipo || 'común',
      });
      sessionStorage.setItem('token', token);
      return { success: true, message: 'Registro exitoso', user: decoded };
    } catch (error) {
      const message = error?.response?.data?.message || 'Error al registrarse';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);