import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            login(response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-dark-secondary p-8 rounded-xl">
            <h2 className="text-2xl text-neon-yellow mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-dark-primary rounded text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300 mb-2">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-dark-primary rounded text-gray-100"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neon-yellow text-dark-primary py-2 rounded hover:bg-yellow-400 transition-colors"
                >
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;