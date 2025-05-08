import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/register',
        { 
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim()
        },
        {
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      const errorData = err.response?.data?.errors || err.response?.data;
      setError(
        errorData?.email || 
        errorData?.username || 
        errorData?.password || 
        'Error en el registro'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          🚀 Crear Cuenta
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-gray-700 mb-3 font-medium">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              minLength="3"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-3 font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-3 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              minLength="6"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Registrando...
              </div>
            ) : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          ¿Ya tienes cuenta? {' '}
          <Link 
            to="/login" 
            className="text-blue-900 font-semibold hover:underline"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}