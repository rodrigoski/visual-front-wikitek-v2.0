import React from 'react'; // ✅ Importa React
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/auth/register", {  // Ruta corregida
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "rodrigoski",
                email: "asdasda@gmail.com",
                password: "tu_contraseña"
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Error desconocido");
        }
        alert("¡Registro exitoso!");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};