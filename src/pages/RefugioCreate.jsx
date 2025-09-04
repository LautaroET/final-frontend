// src/pages/RefugioCreate.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RefugioCreateForm from '../components/RefugioCreateForm';
import { createRefugio } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const RefugioCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ usuario logueado

  const handleSubmit = async (data) => {
    const payload = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: data.imagen[0], // si solo usas una imagen
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      capacidad: data.capacidad,
      sitioWeb: data.sitioWeb || undefined,
      horariosAtencion: data.horariosAtencion || undefined,
      redesSociales: {
        facebook: data.facebook || undefined,
        instagram: data.instagram || undefined,
        twitter: data.twitter || undefined,
      },
      userId: user._id, // ✅ ID del usuario logueado
    };

    try {
      await createRefugio(payload);
      toast.success('Refugio creado exitosamente!');
      navigate('/refugios');
    } catch (error) {
      toast.error('Hubo un error al crear el refugio.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center mb-8">
          Nuevo Refugio
        </h1>
        <RefugioCreateForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RefugioCreate;