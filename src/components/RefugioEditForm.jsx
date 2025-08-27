import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button'; 
import { fetchRefugioById, updateRefugio } from '../services/apiService';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

// Esquema de validación para el formulario
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  phone: yup.string().matches(/^[0-9]+$/, 'El teléfono solo debe contener números').min(7, 'El teléfono debe tener al menos 7 dígitos').required('El teléfono es obligatorio'),
  email: yup.string().email('Debe ser un correo electrónico válido').required('El email es obligatorio'),
  website: yup.string().url('Debe ser una URL válida').required('El sitio web es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  capacity: yup.number().positive('La capacidad debe ser un número positivo').integer('La capacidad debe ser un número entero').required('La capacidad es obligatoria').typeError('La capacidad debe ser un número'),
  image: yup.string().url('Debe ser una URL de imagen válida').required('La URL de la imagen es obligatoria'),
  adoptionProcess: yup.string().required('El proceso de adopción es obligatorio'),
});

const RefugioEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchRefugioData = async () => {
      try {
        const data = await fetchRefugioById(id);
        reset(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error al cargar los datos del refugio.");
        console.error(error);
        setIsLoading(false);
      }
    };
    
    fetchRefugioData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await updateRefugio(id, data);
      toast.success('Refugio actualizado exitosamente!');
      navigate('/refugios');
    } catch (error) {
      toast.error('Hubo un error al actualizar el refugio.');
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Editar Refugio</h2>
      
      <fieldset className="border border-gray-300 dark:border-gray-600 p-4 rounded-md mb-6">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">
          Información Básica del Refugio
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nombre */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Dirección */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label>
            <input
              type="text"
              id="address"
              {...register('address')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Sitio Web */}
          <div className="flex flex-col">
            <label htmlFor="website" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sitio Web</label>
            <input
              type="url"
              id="website"
              {...register('website')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
          </div>

          {/* Capacidad */}
          <div className="flex flex-col">
            <label htmlFor="capacity" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacidad</label>
            <input
              type="number"
              id="capacity"
              {...register('capacity')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
          </div>

          {/* URL de la imagen */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de la Imagen</label>
            <input
              type="url"
              id="image"
              {...register('image')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 dark:border-gray-600 p-4 rounded-md mb-6">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">
          Información Adicional
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Descripción */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              id="description"
              rows="4"
              {...register('description')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          {/* Proceso de Adopción */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="adoptionProcess" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proceso de Adopción</label>
            <textarea
              id="adoptionProcess"
              rows="4"
              {...register('adoptionProcess')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.adoptionProcess && <p className="text-red-500 text-sm mt-1">{errors.adoptionProcess.message}</p>}
          </div>
        </div>
      </fieldset>
      
      <div className="mt-8 flex justify-end">
        <Button type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};

export default RefugioEditForm;