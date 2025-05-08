import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const menuItems = [
    { name: "Alumnos", path: "/alumnos", emoji: "👨🎓" },
    { name: "Maestros", path: "/maestros", emoji: "👩🏫" },
    { name: "Sitios", path: "/sitios", emoji: "🏛️" },
    { name: "Historia", path: "/lore", emoji: "📜" },
  ];

  return (
    <header className="bg-dark-secondary/90 backdrop-blur-md py-4 border-b border-neon-yellow/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-neon-yellow flex items-center gap-2">
          <div className="bg-neon-yellow/10 p-2 rounded-lg">🏛️</div>
          WikiTek
        </Link>

        <div className="flex items-center gap-6">
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-dark-accent/50 rounded-lg transition-all"
              >
                <span className="text-neon-yellow">🌐 Explorar</span>
                <svg 
                  className={`w-4 h-4 text-neon-yellow transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-secondary rounded-lg py-2 shadow-xl border border-dark-accent">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-dark-accent/30 text-gray-300"
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

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 hover:text-neon-yellow transition-all"
                >
                  <img
                    src={user.profileImage || '/img/default-avatar.png'}
                    className="w-8 h-8 rounded-full border border-neon-yellow/30"
                    alt="Perfil"
                  />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-red-400 hover:text-red-300 border border-red-400/30 rounded-lg hover:border-red-300/50 transition-all"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-neon-yellow text-dark-primary rounded-lg hover:bg-yellow-300 transition-all"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-neon-yellow text-neon-yellow rounded-lg hover:bg-dark-accent/30 transition-all"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;