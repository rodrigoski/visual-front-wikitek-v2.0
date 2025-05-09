import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StudentsList = ({ refreshKey }) => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay sesión activa');
          return;
        }
    
        const response = await axios.get('http://localhost:5000/students', {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
    
        // Asegurar que skills sea un array incluso si está vacío
        const formattedStudents = response.data.map(student => ({
          ...student,
          skills: student.skills || []
        }));
    
        setStudents(formattedStudents);
        
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Error desconocido';
        setError(`Error al cargar estudiantes: ${errorMessage}`);
        console.error('Detalles del error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStudents();
  }, [token, refreshKey]);

  if (loading) return <div className="text-neon-yellow p-4">Cargando estudiantes...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-4">
      {students.map(student => (
        <div key={student.id} className="bg-dark-secondary p-4 rounded-lg hover:bg-dark-accent transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl text-neon-yellow font-semibold">{student.full_name}</h3>
              <p className="text-gray-400">{student.email}</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-dark-primary px-2 py-1 rounded text-sm">
                  Semestre {student.semester}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(student.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {student.skills.split(',').map((skill, index) => (
                <span key={index} className="block">• {skill.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsList;