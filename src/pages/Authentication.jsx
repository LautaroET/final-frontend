// Authentication.jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import IniciarSesion from '../components/IniciarSesion';
import Registrarse from '../components/Registrarse';

const Authentication = () => {
  const [modal, setModal] = useState(null); // null | 'login' | 'register'
  const open = (name) => setModal(name);
  const close = () => setModal(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50 dark:from-indigo-900 dark:via-blue-900 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700 overflow-hidden">
        {/* Hero gradient banner */}
        <div className="h-28 bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-indigo-800 dark:to-blue-900 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ¡Bienvenido!
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            Accede a <span className="font-semibold text-blue-700 dark:text-blue-400">Patitas al Rescate</span>
          </p>

          <div className="flex gap-4">
            <Button
              onClick={() => open('login')}
              className="flex-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white"
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => open('register')}
              className="flex-1 bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800 text-white"
            >
              Registrarse
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Al continuar, aceptas nuestros términos y condiciones.
          </p>
        </div>
      </div>

      <Modal isOpen={modal === 'login'} onClose={close}>
        <IniciarSesion onClose={close} />
      </Modal>

      <Modal isOpen={modal === 'register'} onClose={close}>
        <Registrarse onClose={close} />
      </Modal>
    </div>
  );
};

export default Authentication;