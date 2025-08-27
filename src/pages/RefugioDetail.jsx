import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import MascotaCard from '../components/MascotaCard';
import Button from '../components/Button';
import { useRefugioDetail } from '../hook/useRefugioDetail';
import { deleteRefugio, getMascotasByRefugio } from '../services/apiService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const RefugioDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refugio, isLoading, error } = useRefugioDetail(id);
    const [mascotas, setMascotas] = useState([]);
    const [loadingMascotas, setLoadingMascotas] = useState(true);

    useEffect(() => {
        const fetchMascotas = async () => {
            if (refugio) {
                setLoadingMascotas(true);
                try {
                    const mascotasData = await getMascotasByRefugio(refugio.id);
                    setMascotas(mascotasData);
                } catch (err) {
                    console.error("Error obteniendo mascotas del refugio:", err);
                    toast.error('Error al cargar las mascotas del refugio.');
                } finally {
                    setLoadingMascotas(false);
                }
            }
        };

        fetchMascotas();
    }, [refugio]);

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Eliminar este refugio también eliminará sus mascotas.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteRefugio(id);
                    toast.success('Refugio eliminado exitosamente.');
                    navigate('/refugios');
                } catch (err) {
                    toast.error('Error al eliminar el refugio.');
                    console.error("Error al eliminar:", err);
                }
            }
        });
    };

    const handleAddMascota = () => {
        navigate(`/mascotas/nuevo?refugioId=${refugio.id}`);
    };

    if (isLoading) return <Loader />;
    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-center bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
            <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
                <Button onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
    );
    if (!refugio) return <p className="text-center text-gray-600 dark:text-gray-400">Refugio no encontrado.</p>;

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <Button onClick={() => navigate(-1)} className="mb-4 md:mb-0">
                        <i className="bi bi-arrow-left-circle-fill mr-2"></i>Volver
                    </Button>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button onClick={() => navigate(`/refugios/${refugio.id}/editar`)}>
                            <i className="bi bi-pencil-square mr-2"></i>Editar Refugio
                        </Button>
                        <Button onClick={handleDelete} >
                            <i className="bi bi-trash-fill mr-2"></i>Eliminar Refugio
                        </Button>
                    </div>
                </div>

                {/* Información del refugio */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800 mb-8">
                    <img
                        src={refugio.image}
                        alt={`Imagen de ${refugio.name}`}
                        className="w-full h-80 md:h-96 object-cover object-center"
                    />
                    <div className="p-6 md:p-8 text-gray-800 dark:text-gray-200">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-blue-400 mb-4">
                            {refugio.name}
                        </h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-blue-300">
                                    Información de Contacto
                                </h2>
                                <p className="flex items-center mb-2">
                                    <i className="bi bi-geo-alt-fill text-indigo-500 mr-2 text-lg"></i>
                                    <span>{refugio.address}</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <i className="bi bi-telephone-fill text-indigo-500 mr-2 text-lg"></i>
                                    <span>{refugio.phone}</span>
                                </p>
                                <p className="flex items-center">
                                    <i className="bi bi-envelope-fill text-indigo-500 mr-2 text-lg"></i>
                                    <span>{refugio.email}</span>
                                </p>
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-blue-300">
                                    Horario de Atención
                                </h2>
                                <p className="mb-2">{refugio.openingHours || 'Lunes a Viernes: 9:00 - 18:00'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {refugio.adoptionProcess || 'Contactar para proceso de adopción'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-blue-300">
                                Descripción
                            </h2>
                            <p className="text-lg leading-relaxed">{refugio.description}</p>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-blue-300">
                                Proceso de Adopción
                            </h2>
                            <p className="text-lg leading-relaxed">{refugio.adoptionProcess}</p>
                        </div>
                    </div>
                </div>

                {/* Mascotas del refugio */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-indigo-700 dark:text-blue-400">
                            Mascotas en este refugio
                        </h2>
                        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                            {mascotas.length} mascotas
                        </span>
                    </div>
                    <div className='m-8'>
                        <Button onClick={handleAddMascota} >
                            <i className="bi bi-plus-circle-fill mr-2"></i>Agregar Mascota
                        </Button>
                    </div>

                    {loadingMascotas ? (
                        <Loader />
                    ) : mascotas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {mascotas.map((mascota) => (
                                <MascotaCard key={mascota.id} mascota={mascota} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
                            <i className="bi bi-inbox text-5xl text-gray-400 dark:text-gray-500 mb-4"></i>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                                Este refugio no tiene mascotas registradas
                            </p>
                            <Button onClick={handleAddMascota} className="bg-indigo-600 hover:bg-indigo-700">
                                <i className="bi bi-plus-circle-fill mr-2"></i>Agregar Primera Mascota
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RefugioDetail;