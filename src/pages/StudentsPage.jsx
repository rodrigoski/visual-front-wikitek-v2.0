// src/pages/StudentsPage.jsx
import React from 'react';
export const estudiantes = [ // ✅ Exportación requerida
  {
    name: "María García",
    email: "maria@example.com",
    skills: ["React", "Node.js"],
  },
  {
    name: "Carlos López",
    email: "carlos@example.com",
    skills: ["Python", "Django"],
  },
];

// Componente opcional (si necesitas una página UI)
const StudentsPage = () => {
  return <div>Lista de estudiantes</div>;
};

export default StudentsPage;