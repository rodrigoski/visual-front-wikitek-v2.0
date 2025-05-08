import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Header'; // ✅ Importación correcta

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> 
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Menú Lateral */}
          <nav className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Secciones</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/project/alumnos" 
                  className="block p-2 hover:bg-blue-50 rounded transition-colors"
                >
                  👥 Alumnos
                </Link>
              </li>
              <li>
                <Link 
                  to="/project/maestros" 
                  className="block p-2 hover:bg-blue-50 rounded transition-colors"
                >
                  🎓 Maestros
                </Link>
              </li>
              <li>
                <Link 
                  to="/project/lore" 
                  className="block p-2 hover:bg-blue-50 rounded transition-colors"
                >
                  📜 Lore
                </Link>
              </li>
              <li>
                <Link 
                  to="/project/sitios" 
                  className="block p-2 hover:bg-blue-50 rounded transition-colors"
                >
                  🏛 Sitios
                </Link>
              </li>
            </ul>
          </nav> 
          {/* Contenido Principal */}
          <main className="flex-1">
            <Outlet /> {/* Aquí se renderizarán las subpáginas */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;