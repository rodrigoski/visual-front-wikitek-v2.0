import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UniversalForm = (props) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    semester: '1',
    skills: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  // Configuración dinámica del formulario
  const formConfig = {
    alumno: {
      endpoint: '/api/students/new',
      transformData: (data) => ({
        full_name: data.full_name.trim(),
        email: data.email.toLowerCase().trim(),
        semester: String(data.semester),
        skills: data.skills.trim() || 'Sin habilidades especificadas'
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setFieldErrors({});

    if (!token) {
      setError("Debes iniciar sesión para enviar el formulario");
      return;
    }

    setIsSubmitting(true);

    // Validación básica del cliente
    const validationErrors = {};
    if (!formData.full_name.trim()) validationErrors.full_name = "Nombre requerido";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) validationErrors.email = "Email inválido";
    if (!['1','2','3','4'].includes(formData.semester)) validationErrors.semester = "Semestre inválido";
    
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const transformedData = formConfig.alumno.transformData(formData);
      
      const response = await axios.post(
        `http://localhost:5000${formConfig.alumno.endpoint}`,
        transformedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccess('¡Estudiante registrado exitosamente!');
        setFormData({
          full_name: '',
          email: '',
          semester: '1',
          skills: ''
        });
        if (props.onStudentCreated) props.onStudentCreated(); // Actualiza la lista
      }

    } catch (err) {
      console.error('Error en el registro:', err.response?.data);
      
      if (err.response?.status === 422) {
        setFieldErrors(err.response.data.errors || {});
        setError('Corrige los errores en el formulario');
      } else if (err.response?.status === 401) {
        setError('Sesión expirada - Vuelve a iniciar sesión');
      } else {
        setError(err.response?.data?.error || 'Error en el servidor');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semester' ? value.replace(/[^1-4]/g, '') : value
    }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="bg-dark-secondary p-6 rounded-xl">
      {error && <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">{error}</div>}
      {success && <div className="text-green-500 mb-4 p-3 bg-green-100 rounded">{success}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-neon-yellow">Nombre Completo *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="w-full p-2 bg-dark-primary rounded"
          />
          {fieldErrors.full_name && <p className="text-red-400 text-sm">{fieldErrors.full_name}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-neon-yellow">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 bg-dark-primary rounded"
          />
          {fieldErrors.email && <p className="text-red-400 text-sm">{fieldErrors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-neon-yellow">Semestre *</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="w-full p-2 bg-dark-primary rounded"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {fieldErrors.semester && <p className="text-red-400 text-sm">{fieldErrors.semester}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-neon-yellow">Habilidades (separadas por comas) *</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full p-2 bg-dark-primary rounded"
          />
          {fieldErrors.skills && <p className="text-red-400 text-sm">{fieldErrors.skills}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neon-yellow text-dark-primary py-2 rounded hover:bg-yellow-400 disabled:opacity-50"
        >
          {isSubmitting ? 'Registrando...' : 'Registrar Estudiante'}
        </button>
      </form>
    </div>
    // DEfault configuration for register teachers
  );
};
export default UniversalForm;