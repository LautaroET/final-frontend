Netlify

https://refugioadopcion.netlify.app/


# 🐾 Patitas al Rescate - Gestión de Refugios de Mascotas

Una aplicación web completa para gestionar refugios de animales y mascotas en adopción, construida con React, Vite y TailwindCSS.

## ✨ Características

- 🏠 **Gestión de Refugios** - CRUD completo de refugios de animales
- 🐶 **Gestión de Mascotas** - CRUD completo de mascotas en adopción
- ⭐ **Sistema de Favoritos** - Guarda tus refugios y mascotas favoritos
- 🌙 **Tema Claro/Oscuro** - Interfaz adaptable a preferencias del usuario
- 🔍 **Búsqueda Avanzada** - Encuentra refugios y mascotas por nombre o ubicación
- 📱 **Diseño Responsivo** - Funciona perfecto en desktop, tablet y móvil
- 🔐 **Sistema de Autenticación** - Páginas de login y registro de usuarios

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite
- **Estilos:** TailwindCSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Formularios:** React Hook Form + Yup
- **Notificaciones:** React Toastify
- **Confirmaciones:** SweetAlert2
- **Iconos:** Bootstrap Icons

## 🚀 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/LautaroET/modulo4-sprint5-tp]
   cd patitas-al-rescate

2. **Instalar dependencias:**
npm install
3. **Configurar variables de entorno:**
# Crear archivo .env
VITE_API_URL=?
4. **Iniciar servidor de desarrollo:**
npm run dev
5- **Abrir en el navegador:**
http://localhost:5173
📁 Estructura del Proyecto
src/
├── components/          # Componentes reutilizables
│   ├── Button.jsx
│   ├── Loader.jsx
│   ├── MascotaCard.jsx
│   ├── MascotaCreateForm.jsx
│   ├── MascotaEditForm.jsx
│   ├── MascotaList.jsx
│   ├── Pagination.jsx
│   ├── RefugioCard.jsx
│   ├── RefugioCreateForm.jsx
│   ├── RefugioEditForm.jsx
│   ├── RefugioList.jsx
│   ├── SearchInput.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── FavoritesModal.jsx
├── pages/               # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Mascotas.jsx
│   ├── MascotaDetail.jsx
│   ├── MascotaCreate.jsx
│   ├── MascotaEdit.jsx
│   ├── Refugios.jsx
│   ├── RefugioDetail.jsx
│   ├── RefugioCreate.jsx
│   ├── RefugioEdit.jsx
│   ├── Authentication.jsx
│   ├── IniciarSesion.jsx
│   ├── Registrarse.jsx
│   ├── Perfil.jsx
│   └── NotFound.jsx
├── context/             # Contextos de estado global
│   ├── FavoritosContext.jsx
│   └── TemaContext.jsx
├── hook/                # Custom hooks
│   ├── useMascotas.js
│   ├── useMascotaDetail.js
│   ├── useRefugios.js
│   └── useRefugioDetail.js
├── services/            # Servicios API
│   └── apiService.js
├── utils/               # Utilidades
│   └── link.js
├── Router/              # Configuración de rutas
│   └── AppRouter.jsx
└── App.jsx
🎯 Funcionalidades Principales
Gestión de Refugios
Listar todos los refugios

Ver detalles de un refugio

Crear nuevo refugio

Editar refugio existente

Eliminar refugio con confirmación

Búsqueda por nombre o dirección

Gestión de Mascotas
Listar todas las mascotas

Ver detalles de una mascota

Crear nueva mascota

Editar mascota existente

Eliminar mascota con confirmación

Búsqueda por nombre o características

Relación con refugios

Sistema de Favoritos
Agregar/eliminar refugios de favoritos

Agregar/eliminar mascotas de favoritos

Persistencia en localStorage

Modal de visualización de favoritos

UI/UX
Tema claro/oscuro con persistencia

Diseño completamente responsivo

Animaciones y transiciones suaves

Loading states durante peticiones

Notificaciones toast para feedback

Confirmaciones SweetAlert2 para eliminaciones

🔌 API Endpoints
La aplicación espera una API RESTful con la siguiente estructura:

Refugios
GET /refugios - Listar refugios

GET /refugios/:id - Obtener refugio por ID

POST /refugios - Crear refugio

PUT /refugios/:id - Actualizar refugio

DELETE /refugios/:id - Eliminar refugio

Mascotas
GET /refugios/:id/pets - Listar mascotas de un refugio

GET /refugios/:id/pets/:petId - Obtener mascota por ID

POST /refugios/:id/pets - Crear mascota en refugio

PUT /refugios/:id/pets/:petId - Actualizar mascota

DELETE /refugios/:id/pets/:petId - Eliminar mascota

🎨 Personalización
Temas y Colores
La aplicación usa TailwindCSS con colores personalizados. Los colores principales son:

Azul primario: blue-600, indigo-700

Amarillo acento: amber-300

Modo oscuro: gray-900, gray-800

Componentes
Los componentes son altamente reutilizables y pueden personalizarse fácilmente modificando las clases de TailwindCSS.

📋 Scripts Disponibles
npm run dev - Inicia servidor de desarrollo

npm run build - Construye para producción

npm run preview - Previsualiza build de producción

npm run lint - Ejecuta ESLint



👨‍💻 Autor
Lautaro Tapia - Tu GitHub

¡Gracias por usar Patitas al Rescate! 🐕🐈
