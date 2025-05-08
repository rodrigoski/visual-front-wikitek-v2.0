import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const menuItems = [
    { name: "Alumnos", path: "/alumnos", emoji: "👨🎓" },
    { name: "Maestros", path: "/maestros", emoji: "👩🏫" },
    { name: "Sitios", path: "/sitios", emoji: "🏛️" },
    { name: "Historia", path: "/lore", emoji: "📜" },
  ];

  return (
    <footer className="bg-dark-primary/90 backdrop-blur-md border-t border-neon-yellow/20 mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 text-gray-400">
          
          <div className="space-y-3">
            <h3 className="text-neon-yellow text-lg font-bold">WikiTek</h3>
            <p className="text-sm">Plataforma educativa líder en innovación</p>
          </div>

          <div>
            <h4 className="text-neon-yellow text-lg font-semibold mb-2">Enlaces</h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="hover:text-neon-yellow transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-neon-yellow text-lg font-semibold mb-2">Contacto</h4>
            <ul className="space-y-2">
              <li>contacto@wikitek.com</li>
              <li>+52 81 1234 5678</li>
            </ul>
          </div>

          <div>
            <h4 className="text-neon-yellow text-lg font-semibold mb-2">Legal</h4>
            <ul className="space-y-2">
              <li>Términos de servicio</li>
              <li>Política de privacidad</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-accent/20 mt-6 pt-6 text-center text-sm">
          <p>© 2024 WikiTek. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;