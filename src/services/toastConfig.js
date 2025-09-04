// src/utils/toastConfig.js
import { toast } from 'react-toastify';

/* ---------- ESTILOS GLOBALES (opcional) ----------
   Añadí esta línea en main.jsx:
   <ToastContainer {...toastGlobalOptions} />
*/
export const toastGlobalOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

/* ---------- FUNCIONES PRE-ESTILIZADAS ---------- */
export const toastSuccess = (msg, opts = {}) =>
  toast.success(msg, {
    ...toastGlobalOptions,
    style: {
      background: '#10b981', // verde tailwind-500
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(16,185,129,.4)',
    },
    icon: '✅',
    ...opts,
  });

export const toastError = (msg, opts = {}) =>
  toast.error(msg, {
    ...toastGlobalOptions,
    style: {
      background: '#ef4444', // rojo tailwind-500
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(239,68,68,.4)',
    },
    icon: '❌',
    ...opts,
  });

export const toastWarning = (msg, opts = {}) =>
  toast.warning(msg, {
    ...toastGlobalOptions,
    style: {
      background: '#f59e0b', // ámbar tailwind-500
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(245,158,11,.4)',
    },
    icon: '⚠️',
    ...opts,
  });

export const toastInfo = (msg, opts = {}) =>
  toast.info(msg, {
    ...toastGlobalOptions,
    style: {
      background: '#3b82f6', // azul tailwind-500
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(59,130,246,.4)',
    },
    icon: 'ℹ️',
    ...opts,
  });

/* ---------- TOAST CON ACCIÓN (ej. confirmar adopción) ---------- */
export const toastConfirmAction = ({ title, onConfirm, onCancel }) =>
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{title}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
          >
            Sí
          </button>
          <button
            onClick={() => {
              if (onCancel) onCancel();
              closeToast();
            }}
            className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm"
          >
            No
          </button>
        </div>
      </div>
    ),
    { closeButton: false, autoClose: false }
  );