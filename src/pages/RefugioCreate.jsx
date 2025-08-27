import React from 'react';
import RefugioCreateForm from '../components/RefugioCreateForm';
import { createRefugio } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RefugioCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createRefugio(data);
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