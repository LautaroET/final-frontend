import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import MascotaCard from '../components/MascotaCard';
import Button from '../components/Button';
import { useRefugioDetail } from '../hook/useRefugioDetail';
import { getMascotasByRefugio } from '../services/apiService';
import { toast } from 'react-toastify';

const RefugioDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refugio, isLoading, error } = useRefugioDetail(id);
    const [mascotas, setMascotas] = useState([]);
    const [loadingMascotas, setLoadingMascotas] = useState(true);

    useEffect(() => {
        const fetchMascotas = async () => {
            if (id && refugio) {
                setLoadingMascotas(true);
                try {
                    const response = await getMascotasByRefugio(id);
                    setMascotas(response.data || []);
                } catch (err) {
                    toast.error('Error al cargar las mascotas.');
                } finally {
                    setLoadingMascotas(false);
                }
            }
        };

        fetchMascotas();
    }, [id, refugio]);

    if (isLoading) return <Loader />;
    
    if (error || !refugio) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
                    {error || 'Refugio no encontrado'}
                </p>
                <Button onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <Button onClick={() => navigate(-1)} className="mb-6">
                    <i className="bi bi-arrow-left-circle-fill mr-2"></i>Volver
                </Button>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8">
                    <img
                        src={refugio.image}
                        alt={refugio.nombre}
                        className="w-full h-80 md:h-96 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x400?text=Refugio';
                        }}
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
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6">Mascotas disponibles</h2>
                    {loadingMascotas ? (
                        <Loader />
                    ) : mascotas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {mascotas.map((mascota) => (
                                <MascotaCard key={mascota._id || mascota.id} mascota={mascota} />
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