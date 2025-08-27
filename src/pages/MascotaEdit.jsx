import React from 'react';
import MascotaEditForm from '../components/MascotaEditForm';
import { updateMascota } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const MascotaEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (data) => {
    try {
      await updateMascota(data.refugioId, id, data);
      toast.success('Mascota actualizada exitosamente!');
      navigate(`/mascotas/${id}`);
    } catch (error) {
      toast.error('Hubo un error al actualizar la mascota.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8">
        <MascotaEditForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MascotaEdit;