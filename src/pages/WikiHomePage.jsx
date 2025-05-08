import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

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
  useClickOutside(menuRef, () => setIsMenuOpen(false));
  
  const menuItems = [
    { name: "Alumnos", path: "/wiki/alumnos", emoji: "👨🎓" },    // No modificado
    { name: "Maestros", path: "/wiki/maestros", emoji: "👨🏫" },  // No modificado
    { name: "Sitios", path: "/wiki/sitios", emoji: "🏛️" },      // No modificado
    { name: "Lore", path: "/wiki/lore", emoji: "📜" },          // No modificado
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary to-dark-secondary text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-md py-6 border-b border-neon-yellow/10">
        <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <Link to="/" className="text-3xl font-bold text-neon-yellow flex items-center gap-3 group">
            <div className="bg-neon-yellow/10 p-2 rounded-lg group-hover:bg-neon-yellow/20 transition-all">
              🏛️
            </div>
            <span className="relative">
              WikiTek
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neon-yellow to-transparent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
          </Link>
          
          {/* Menú desplegable con iconos */}
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-accent/40 rounded-lg hover:bg-dark-accent/70 transition-all border border-dark-accent/30 hover:border-neon-yellow/30"
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
              <div className="absolute right-0 mt-2 w-52 bg-dark-secondary/90 backdrop-blur-md rounded-lg py-2 z-50 shadow-xl border border-dark-accent/50 animate-fadeIn">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-3 text-gray-300 hover:bg-dark-accent/40 hover:text-neon-yellow flex items-center gap-3 transition-all group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl bg-dark-accent/20 p-1 rounded group-hover:bg-dark-accent/40 transition-all">{item.emoji}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Botones con iconos */}
          <div className="flex gap-3 ml-auto md:ml-0">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-neon-yellow to-yellow-500 text-dark-primary px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-neon-yellow/20 transition-all font-semibold flex items-center gap-2 transform hover:translate-y-[-2px]"
            >
              🔑 <span>Ingresar</span>
            </Link>
            <Link 
              to="/register" 
              className="border-2 border-neon-yellow/70 text-neon-yellow px-5 py-2 rounded-lg hover:bg-dark-accent/30 transition-all flex items-center gap-2 transform hover:translate-y-[-2px]"
            >
              📝 <span>Registrarse</span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Menú móvil */}
      <div className="md:hidden bg-dark-secondary/90 backdrop-blur-md px-4 py-3 border-b border-dark-accent/30">
        <div className="container mx-auto flex justify-between">
          <h3 className="text-neon-yellow font-medium">Explorar</h3>
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-1 text-sm text-gray-300 bg-dark-accent/30 hover:bg-dark-accent/50 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <span>{item.emoji}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <div className="inline-block mb-6 bg-neon-yellow/10 p-4 rounded-full animate-pulse">
              <span className="text-5xl">🎓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bienvenido al <span className="text-neon-yellow">Sistema Wiki</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto mb-12">
              Tu portal de acceso a toda la información y recursos disponibles. Explora, aprende y contribuye a nuestra base de conocimientos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-dark-secondary/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-dark-accent/30 hover:border-neon-yellow/30 transition-all duration-300 transform hover:translate-y-[-5px] group">
              <div className="bg-neon-yellow/10 group-hover:bg-neon-yellow/20 transition-all p-4 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">¿Nuevo usuario?</h2>
              <p className="text-gray-400 mb-8">Crea tu cuenta y comienza a explorar todo nuestro contenido</p>
              <Link
                to="/register"
                className="bg-gradient-to-r from-neon-yellow to-yellow-500 text-dark-primary px-8 py-3 rounded-lg inline-block hover:shadow-lg hover:shadow-neon-yellow/20 transition-all text-lg font-medium flex items-center justify-center gap-2 mx-auto max-w-xs w-full"
              >
                <span>📋</span> Crear Cuenta
              </Link>
            </div>
            
            <div className="bg-dark-secondary/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-dark-accent/30 hover:border-neon-yellow/30 transition-all duration-300 transform hover:translate-y-[-5px] group">
              <div className="bg-dark-accent/30 group-hover:bg-dark-accent/50 transition-all p-4 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">¿Ya tienes cuenta?</h2>
              <p className="text-gray-400 mb-8">Accede a tu perfil para continuar explorando</p>
              <Link
                to="/login"
                className="bg-dark-accent/50 hover:bg-dark-accent/70 text-neon-yellow border border-neon-yellow/30 px-8 py-3 rounded-lg inline-block hover:shadow-lg transition-all text-lg font-medium flex items-center justify-center gap-2 mx-auto max-w-xs w-full"
              >
                <span>🗝️</span> Iniciar Sesión
              </Link>
            </div>
          </div>
          
          {/* Sección adicional */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-dark-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-neon-yellow/10">
              <h3 className="text-xl font-semibold text-neon-yellow mb-4">Características Principales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-dark-primary/40 rounded-lg text-center">
                  <div className="text-2xl mb-2">👨🎓</div>
                  <p className="text-gray-300">Base de datos de alumnos</p>
                </div>
                <div className="p-4 bg-dark-primary/40 rounded-lg text-center">
                  <div className="text-2xl mb-2">👨🏫</div>
                  <p className="text-gray-300">Perfiles de maestros</p>
                </div>
                <div className="p-4 bg-dark-primary/40 rounded-lg text-center">
                  <div className="text-2xl mb-2">🏛️</div>
                  <p className="text-gray-300">Sitios importantes</p>
                </div>
                <div className="p-4 bg-dark-primary/40 rounded-lg text-center">
                  <div className="text-2xl mb-2">📜</div>
                  <p className="text-gray-300">Historia y lore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-secondary/80 backdrop-blur-md py-6 border-t border-neon-yellow/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 WikiTek - El sistema wiki definitivo</p>
        </div>
      </footer>
    </div>
  );
}