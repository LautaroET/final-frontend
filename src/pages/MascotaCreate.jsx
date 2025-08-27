import React from 'react';
import MascotaCreateForm from '../components/MascotaCreateForm'; 
import { createMascota } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MascotaCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createMascota(data.refugioId, data);
      toast.success('Mascota creada exitosamente!');
      navigate('/mascotas');
    } catch (error) {
      toast.error('Hubo un error al crear la mascota.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center mb-8">
          Nueva Mascota
        </h1>
        <MascotaCreateForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MascotaCreate;