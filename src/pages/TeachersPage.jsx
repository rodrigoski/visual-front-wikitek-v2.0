import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export const maestros = [
  { 
    id: 1, 
    name: "Prof. María García", 
    department: "Ingeniería", 
    email: "maria.garcia@tec.com",
    materia: "Matemáticas Avanzadas"
  },
  { 
    id: 2, 
    name: "Dr. Juan Pérez", 
    department: "Ciencias", 
    email: "juan.perez@tec.com",
    materia: "Física Cuántica"
  }
];

export default function TeachersPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-dark-primary text-gray-100">
      <header className="bg-dark-secondary/80 backdrop-blur-md py-6 border-b border-neon-yellow/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold gradient-text animate-pulse">
            <span className="mr-3">👨🏫</span>
            Directorio de Maestros
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="glass-dark rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            {maestros.map((teacher) => (
              <div 
                key={teacher.id}
                className="group card-dark hover:!border-neon-yellow/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-neon-yellow mb-3 flex items-center gap-3">
                    <span className="shrink-0">👩🏫</span>
                    <span className="border-b-2 border-neon-yellow/30 pb-1">
                      {teacher.name}
                    </span>
                  </h3>
                  
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="badge">📚 Materia</span>
                      <p className="font-medium">{teacher.materia}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="badge">🏢 Departamento</span>
                      <p className="font-medium">{teacher.department}</p>
                    </div>
                    
                    <div className="mt-4">
                      <a 
                        href={`mailto:${teacher.email}`}
                        className="btn-secondary inline-flex items-center"
                      >
                        <span>📧 Contactar</span>
                        <i className="fas fa-arrow-right ml-2 text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}