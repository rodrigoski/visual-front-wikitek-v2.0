import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-dark-primary to-dark-secondary min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-secondary/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neon-yellow/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-10 bg-neon-yellow rounded-full"></div>
            <h1 className="text-3xl font-bold text-white">Panel de Administrador</h1>
          </div>
          
          <p className="text-gray-300 mb-8">Bienvenido al dashboard de administración.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tarjetas de estadísticas */}
            <div className="bg-dark-primary/70 p-5 rounded-lg border border-dark-accent/30 hover:border-neon-yellow/40 transition-all shadow-md">
              <div className="text-neon-yellow text-2xl mb-2">👨🎓</div>
              <h3 className="text-lg font-medium text-gray-200">Alumnos</h3>
              <p className="text-gray-400 text-sm mt-1">Gestión de estudiantes</p>
            </div>
            
            <div className="bg-dark-primary/70 p-5 rounded-lg border border-dark-accent/30 hover:border-neon-yellow/40 transition-all shadow-md">
              <div className="text-neon-yellow text-2xl mb-2">👩🏫</div>
              <h3 className="text-lg font-medium text-gray-200">Maestros</h3>
              <p className="text-gray-400 text-sm mt-1">Administración docente</p>
            </div>
            
            <div className="bg-dark-primary/70 p-5 rounded-lg border border-dark-accent/30 hover:border-neon-yellow/40 transition-all shadow-md">
              <div className="text-neon-yellow text-2xl mb-2">🏛️</div>
              <h3 className="text-lg font-medium text-gray-200">Sitios</h3>
              <p className="text-gray-400 text-sm mt-1">Gestión de ubicaciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;