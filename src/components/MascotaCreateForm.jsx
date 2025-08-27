import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';
import { useRefugios } from '../hook/useRefugios';

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

const MascotaCreateForm = ({ onSubmit }) => {
  const { refugios } = useRefugios();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Información de la Mascota</h2>
      
      {/* Información Básica */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-md dark:border-gray-600">
        <legend className="text-lg font-semibold text-indigo-700 dark:text-blue-400 px-2">
          Información Básica
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

          {/* Refugio */}
          <div className="flex flex-col">
            <label htmlFor="refugioId" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Refugio</label>
            <select
              id="refugioId"
              {...register('refugioId')}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccionar refugio</option>
              {refugios.map((refugio) => (
                <option key={refugio.id} value={refugio.id}>
                  {refugio.name}
                </option>
              ))}
            </select>
            {errors.refugioId && <p className="text-red-500 text-sm mt-1">{errors.refugioId.message}</p>}
          </div>

        </div>
      </fieldset>

      {/* Imagen */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-md dark:border-gray-600">
        <legend className="text-lg font-semibold text-indigo-700 dark:text-blue-400 px-2">
          Imagen
        </legend>
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
      </fieldset>

      {/* Descripción e Historia */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-md dark:border-gray-600">
        <legend className="text-lg font-semibold text-indigo-700 dark:text-blue-400 px-2">
          Descripción e Historia
        </legend>
        <div className="grid grid-cols-1 gap-6">
          
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

      <div className="mt-8 flex justify-end">
        <Button type="submit">
          Crear Mascota
        </Button>
      </div>
    </form>
  );
};

export default MascotaCreateForm;