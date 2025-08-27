  import React from 'react';
  import { Link } from 'react-router-dom';

  const Home = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white transition-colors duration-700 dark:from-indigo-900 dark:to-gray-900">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-white md:text-6xl mb-6 dark:text-gray-200">
            ¡Bienvenido a <span className="text-amber-300">Patitas</span> al <span className="text-amber-300">Rescate</span>! 🐾
          </h1>
          <p className="text-xl text-blue-100 md:text-2xl mb-8 max-w-2xl mx-auto dark:text-gray-400">
            Conectamos mascotas en busca de un hogar con personas que quieren ofrecerles una nueva vida llena de amor.
          </p>
          
          <div className="flex justify-center items-center mb-12">
            <img 
              className="rounded-lg shadow-xl max-w-full h-auto transform transition-all duration-500 hover:scale-105 border-4 border-amber-300" 
              src="/img/home-presenta.webp" 
              alt="Un perro y un gato juntos, simbolizando la amistad y la adopción de mascotas." 
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button >
              <Link 
                to="/adoptar" 
                className="bg-amber-300 hover:bg-amber-400 text-blue-900 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out shadow-lg transform hover:shadow-xl dark:text-gray-900 dark:bg-yellow-400 dark:hover:bg-yellow-500"
              >
                Quiero Adoptar
              </Link>
            </button>
            <Link 
              to="/mascotas" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out shadow-lg transform hover:shadow-xl dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-gray-100"
            >
              Ver Mascotas
            </Link>
          </div>
        </section>
      </div>
    );
  };

  export default Home;