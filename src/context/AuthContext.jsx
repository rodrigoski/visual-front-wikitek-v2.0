import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importación corregida

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: true
    });
    const navigate = useNavigate();

    // Verificar autenticación al cargar la app
    const verifyAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthState(s => ({ ...s, loading: false }));
            return;
        }

        try {
            // Verificar expiración del token
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                throw new Error("Token expirado");
            }

            // Obtener datos del usuario
            const response = await axios.get('http://localhost:5000/auth/me', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }
            });
            
            localStorage.setItem('user', JSON.stringify(response.data));
            setAuthState({ 
                token: token,
                user: response.data,
                loading: false 
            });
            
        } catch (error) {
            console.error('Error de autenticación:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuthState({ 
                token: null, 
                user: null, 
                loading: false 
            });
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                { 
                    email: email.trim().toLowerCase(),
                    password: password.trim()
                },
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    withCredentials: true,
                    timeout: 10000
                }
            );

            // Almacenar token y datos del usuario
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user_info));
            
            // Actualizar estado y redirigir
            setAuthState({
                token: response.data.access_token,
                user: response.data.user_info,
                loading: false
            });
            
            navigate('/', { replace: true });

        } catch (error) {
            let errorMessage = 'Error de conexión';
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            }
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ 
            token: null, 
            user: null, 
            loading: false 
        });
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ 
            ...authState,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);