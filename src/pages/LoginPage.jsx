import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { token, login } = useAuth();

    useEffect(() => {
        if (token) navigate('/', { replace: true });
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
            console.error('Error completo:', {
                error: err,
                request: err.config
            });
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
      <div className="bg-dark-secondary p-8 rounded-xl shadow-2xl w-full max-w-md border border-dark-accent">
        <h1 className="text-3xl font-bold text-neon-yellow mb-8 text-center animate-pulse">
          🔐 Acceso al Sistema
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 text-red-400 rounded-lg border border-red-900/30">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-3 font-medium">
              Correo Electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-dark-primary border border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-yellow/50 text-gray-100"
                placeholder="usuario@dominio.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-400 mb-3 font-medium">
              Contraseña
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-primary border border-dark-accent rounded-lg focus:ring-2 focus:ring-neon-yellow/50 text-gray-100 pr-12"
                  placeholder="••••••••"
                  required
                  minLength="6"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-yellow"
                  disabled={loading}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-yellow text-dark-primary py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-primary"></div>
                Verificando...
              </>
            ) : 'Ingresar'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400">
          ¿No tienes cuenta? {' '}
          <Link 
            to="/register" 
            className="text-neon-yellow font-semibold hover:underline hover:text-yellow-400"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}