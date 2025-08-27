import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';
import { getMascotaById } from '../services/apiService';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

/**
 * Esquema de validación con Yup
 * Define las reglas que cada campo del formulario debe cumplir
 */
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  breed: yup.string().required('La raza es obligatoria'),
  age: yup.number()
    .positive('La edad debe ser un número positivo')
    .integer('La edad debe ser un número entero')
    .required('La edad es obligatoria')
    .typeError('La edad debe ser un número'),
  gender: yup.string().required('El género es obligatorio'),
  size: yup.string().required('El tamaño es obligatorio'),
  personality: yup.string().required('La personalidad es obligatoria'),
  status: yup.string().required('El estado es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  history: yup.string(),
  image: yup.string().url('Debe ser una URL de imagen válida').required('La URL de la imagen es obligatoria'),
  refugioId: yup.string().required('Debe seleccionar un refugio'),
});

/**
 * Componente: MascotaEditForm
 * Descripción: Renderiza un formulario para editar los datos de una mascota.
 * Obtiene los datos desde la API al montar el componente y los precarga en el formulario.
 * 
 * Props:
 * - onSubmit: función que se ejecuta cuando el usuario envía el formulario con datos válidos.
 */
const MascotaEditForm = ({ onSubmit }) => {
  // Obtiene el ID de la mascota desde la URL con useParams
  const { id } = useParams();

  // Estado para manejar la carga de datos
  const [isLoading, setIsLoading] = useState(true);

  // Estado para mostrar el nombre del refugio en el formulario como solo lectura
  const [refugioName, setRefugioName] = useState('');

  // Configuración de react-hook-form con validación usando Yup
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * useEffect: se ejecuta al montar el componente.
   * Llama a la API para obtener los datos de la mascota y precargar el formulario.
   */
  useEffect(() => {
    const fetchMascotaData = async () => {
      try {
        // Llamada a la API para obtener los datos de la mascota por ID
        const data = await getMascotaById(id);

        // Precarga los datos en el formulario con reset
        reset({
          ...data,
          refugioId: data.refugio?.id || ''
        });

        // Guarda el nombre del refugio para mostrarlo en un input de solo lectura
        setRefugioName(data.refugio?.name || '');

        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos de la mascota:", error);
        setIsLoading(false);
      }
    };
    
    fetchMascotaData();
  }, [id, reset]);

  // Mientras se cargan los datos, se muestra un loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Editar Mascota</h2>
      
      {/* Información Básica */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Información Básica</legend>
        
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

          {/* Raza */}
          <div className="flex flex-col">
            <label htmlFor="breed" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raza</label>
            <input
              type="text"
              id="breed"
              {...register('breed')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed.message}</p>}
          </div>

          {/* Edad */}
          <div className="flex flex-col">
            <label htmlFor="age" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Edad (años)</label>
            <input
              type="number"
              id="age"
              {...register('age')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>

          {/* Género */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Género</label>
            <select
              id="gender"
              {...register('gender')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          {/* Tamaño */}
          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamaño</label>
            <select
              id="size"
              {...register('size')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar tamaño</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
            {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
          </div>

          {/* Personalidad */}
          <div className="flex flex-col">
            <label htmlFor="personality" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Personalidad</label>
            <input
              type="text"
              id="personality"
              {...register('personality')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.personality && <p className="text-red-500 text-sm mt-1">{errors.personality.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Estado y Refugio */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Estado y Ubicación</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estado */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
            <select
              id="status"
              {...register('status')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar estado</option>
              <option value="En adopción">En adopción</option>
              <option value="Adoptado">Adoptado</option>
              <option value="Reservado">Reservado</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          {/* Refugio (solo lectura) */}
          <div className="flex flex-col">
            <label htmlFor="refugioId" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Refugio</label>
            <input
              type="text"
              id="refugioName"
              value={refugioName}
              readOnly
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-not-allowed"
            />
            {errors.refugioId && <p className="text-red-500 text-sm mt-1">{errors.refugioId.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Imagen y Descripción */}
      <fieldset className="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
        <legend className="text-lg font-medium text-gray-800 dark:text-gray-200 px-2">Imagen y Descripción</legend>
        
        <div className="grid grid-cols-1 gap-6">
          {/* URL de la imagen */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de la Imagen</label>
            <input
              type="url"
              id="image"
              {...register('image')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              id="description"
              rows="4"
              {...register('description')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Historia */}
          <div className="flex flex-col">
            <label htmlFor="history" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Historia (opcional)</label>
            <textarea
              id="history"
              rows="3"
              {...register('history')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            {errors.history && <p className="text-red-500 text-sm mt-1">{errors.history.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Botón de enviar */}
      <div className="mt-8 flex justify-end">
        <Button type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};

export default MascotaEditForm;