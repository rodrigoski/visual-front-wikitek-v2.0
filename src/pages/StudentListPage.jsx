import React, { useState, useEffect } from 'react';
import UniversalForm from '../components/UniversalForm';

const StudentsList = ({ refreshKey }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/students/');
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [refreshKey]);

  if (loading) return <div className="text-neon-yellow">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <div 
          key={student.id}
          className="bg-dark-tertiary p-4 rounded-lg transition-all hover:bg-opacity-80 hover:transform hover:scale-[1.01]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-neon-yellow text-lg font-semibold">{student.full_name}</h3>
              <p className="text-gray-300 text-sm">{student.email}</p>
            </div>
            <span className="bg-neon-yellow text-dark-primary px-2 py-1 rounded text-sm">
              Semester {student.semester}
            </span>
          </div>
          
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-dark-secondary rounded-full text-sm text-neon-yellow border border-neon-yellow"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>Created: {new Date(student.created_at).toLocaleDateString()}</div>
              <div>Updated: {new Date(student.updated_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentListPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-dark-primary p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-neon-yellow mb-8 font-bold">Gestión de Estudiantes</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-secondary p-6 rounded-xl shadow-lg">
            <h2 className="text-xl text-neon-yellow mb-4 border-b border-neon-yellow pb-2">
              Estudiantes Registrados
            </h2>
            <StudentsList refreshKey={refreshKey} />
          </div>
          
          {/* Si necesitas el formulario descomenta esta sección */}
          {/* <div className="bg-dark-secondary p-6 rounded-xl shadow-lg">
            <UniversalForm 
              onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;