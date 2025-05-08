import React, { useState } from 'react';
import StudentsList from '../components/StudentsList';
import UniversalForm from '../components/UniversalForm';

const StudentListPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-dark-primary p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-neon-yellow mb-8">Gestión de Estudiantes</h1>
        
        <div className="grid md:grid-cols-2 gap-8">

          {/* Sección de Listado */}
          <div className="bg-dark-secondary p-6 rounded-xl">
            <h2 className="text-xl text-neon-yellow mb-4">Estudiantes Registrados</h2>
            <StudentsList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;