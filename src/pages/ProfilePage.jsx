import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    👤 Perfil de {user?.username}
                </h1>
                <div className="space-y-3">
                    <div>
                        <label className="font-semibold text-gray-700">Usuario:</label>
                        <p className="text-gray-600">{user?.username}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Email:</label>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Miembro desde:</label>
                        <p className="text-gray-600">
                            {new Date(user?.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;