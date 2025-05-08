import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from '../context/AuthContext';

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { token } = useAuth();
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const menuItems = [
    { name: "Alumnos", path: "/alumnos", emoji: "👨🎓" },
    { name: "Maestros", path: "/maestros", emoji: "👨🏫" },
    { name: "Sitios", path: "/sitios", emoji: "🏛️" },
    { name: "Lore", path: "/lore", emoji: "📜" },
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-gray-100 flex flex-col">
      <header className="bg-dark-secondary/80 backdrop-blur-md py-6 border-b border-neon-yellow/10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-neon-yellow">
            🏛️ WikiTek
          </Link>
          
          {token && ( // ✅ Solo muestra menú si está autenticado
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-dark-accent rounded-lg hover:bg-dark-secondary transition-all"
              >
                <span className="text-neon-yellow">🌐 Explorar</span>
                <svg 
                  className={`w-4 h-4 transition-transform text-neon-yellow ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-secondary rounded-lg py-2 z-50 shadow-xl">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-3 text-gray-300 hover:bg-dark-accent hover:text-neon-yellow flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4">
            {!token ? ( // ✅ Muestra botones de login/register solo si no está autenticado
              <>
                <Link 
                  to="/login" 
                  className="bg-neon-yellow text-dark-primary px-4 py-2 rounded-lg hover:bg-yellow-300 transition-all font-semibold flex items-center gap-2"
                >
                  🔑 Ingresar
                </Link>
                <Link 
                  to="/register" 
                  className="border-2 border-neon-yellow text-neon-yellow px-4 py-2 rounded-lg hover:bg-dark-accent transition-all flex items-center gap-2"
                >
                  📝 Registrarse
                </Link>
              </>
            ) : (
              // ✅ Muestra contenido adicional cuando está autenticado
              <Link 
                to="/perfil" 
                className="border-2 border-neon-yellow text-neon-yellow px-4 py-2 rounded-lg hover:bg-dark-accent transition-all flex items-center gap-2"
              >
                👤 Perfil
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-neon-yellow mb-8">
            {token ? '🎓 Bienvenido de vuelta' : '🎓 Bienvenido al Sistema Wiki'}
          </h1>
          
          {!token ? ( // ✅ Contenido para usuarios no autenticados
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-dark-secondary p-8 rounded-xl shadow-2xl transition-transform hover:scale-105">
                <h2 className="text-2xl font-bold mb-6">🚀 ¿Nuevo usuario?</h2>
                <Link
                  to="/register"
                  className="bg-neon-yellow text-dark-primary px-8 py-4 rounded-lg inline-block hover:bg-yellow-300 transition-all text-lg"
                >
                  Crear Cuenta
                </Link>
              </div>
              
              <div className="bg-dark-secondary p-8 rounded-xl shadow-2xl transition-transform hover:scale-105">
                <h2 className="text-2xl font-bold mb-6">🔐 ¿Ya tienes cuenta?</h2>
                <Link
                  to="/login"
                  className="bg-dark-accent text-neon-yellow px-8 py-4 rounded-lg inline-block hover:bg-dark-primary transition-all text-lg"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          ) : ( // ✅ Contenido para usuarios autenticados
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300 mb-8">
                Explora todas las funcionalidades disponibles
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="bg-dark-secondary p-6 rounded-xl hover:bg-dark-accent transition-all flex items-center gap-4"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xl">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}