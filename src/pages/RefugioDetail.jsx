// src/pages/RefugioDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import MascotaCard from '../components/MascotaCard';
import Button from '../components/Button';
import { useRefugioDetail } from '../hook/useRefugioDetail';
import { getMascotasByRefugio, deleteRefugio } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const RefugioDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // usuario logueado
    const { refugio, isLoading, error } = useRefugioDetail(id);
    const [mascotas, setMascotas] = useState([]);
    const [loadingMascotas, setLoadingMascotas] = useState(true);

    // Cargar mascotas
    useEffect(() => {
        if (!id) return;
        setLoadingMascotas(true);
        getMascotasByRefugio(id)
        .then(({ data }) => setMascotas(data || []))
        .catch(() => toast.error('Error al cargar las mascotas'))
        .finally(() => setLoadingMascotas(false));
    }, [id]);

    if (isLoading) return <Loader />;
    if (error || !refugio)
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
                {error || 'Refugio no encontrado'}
            </p>
            <Button onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
        );

    // ¿Es el dueño?
    const esDueño = user && refugio.usuario && user._id === refugio.usuario._id;

    // Eliminar refugio
    const handleDelete = async () => {
        if (!window.confirm('¿Eliminar este refugio? Se borrarán también sus mascotas.')) return;
        try {
        await deleteRefugio(refugio._id);
        toast.success('Refugio eliminado');
        navigate('/refugios');
        } catch {
        toast.error('No se pudo eliminar');
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
            {/* Volver */}
            <Button onClick={() => navigate(-1)} className="mb-6">
            <i className="bi bi-arrow-left-circle-fill mr-2" />
            Volver
            </Button>

            {/* Tarjeta del refugio */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 relative">
            {/* Botones de dueño */}
            {esDueño && (
                <div className="absolute top-4 right-4 flex gap-2">
                <Button
                    variant="secondary"
                    onClick={() => navigate(`/refugios/${refugio._id}/editar`)}
                >
                    <i className="bi bi-pencil-square mr-1" /> Editar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash3 mr-1" /> Eliminar
                </Button>
                </div>
            )}

            <img
                src={refugio.imagen}
                alt={refugio.nombre}
                className="w-full h-80 md:h-96 object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/800x400?text=Refugio')}
            />
            <div className="p-6 md:p-8">
                <h1 className="text-4xl font-bold text-indigo-700 dark:text-blue-400 mb-4">
                {refugio.nombre}
                </h1>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contacto</h3>
                    <p>{refugio.direccion}</p>
                    <p>{refugio.telefono}</p>
                    <p>{refugio.email}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Información</h3>
                    <p>{refugio.descripcion}</p>
                </div>
                </div>

                {/* Botón agregar mascota (solo dueño) */}
                {esDueño && (
                <div className="mt-6">
                    <Button onClick={() => navigate(`/refugios/${refugio._id}/mascotas/nueva`)}>
                    <i className="bi bi-plus-circle mr-2" />
                    Agregar mascota
                    </Button>
                </div>
                )}
            </div>
            </div>

            {/* Listado de mascotas */}
            <div>
            <h2 className="text-3xl font-bold mb-6">Mascotas disponibles</h2>
            {loadingMascotas ? (
                <Loader />
            ) : mascotas.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mascotas.map((m) => (
                    <MascotaCard key={m._id || m.id} mascota={m} />
                ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No hay mascotas registradas</p>
            )}
            </div>
        </div>
        </div>
    );
};

export default RefugioDetail;