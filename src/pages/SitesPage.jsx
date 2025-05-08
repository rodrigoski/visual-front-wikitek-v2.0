// Exportamos el array de sitios
import React from 'react';
export const sitios = [
  { 
    id: 1, 
    nombre: "Biblioteca Central", 
    location: "Edificio A", 
    status: "Abierto",
    descripcion: "Edificio histórico con más de 50,000 volúmenes"
  },
  { 
    id: 2, 
    nombre: "Laboratorio de Computación", 
    location: "Edificio B", 
    status: "En mantenimiento",
    descripcion: "Equipado con tecnología de última generación"
  }
];

export default function SitesPage() {
  return (
    <div className="min-h-screen bg-dark-primary text-gray-100">
      <header className="bg-dark-secondary py-6 border-b border-dark-accent">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-neon-yellow">🏛️ Sitios Institucionales</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {sitios.map((site) => (
            <div key={site.id} className="bg-dark-secondary p-6 rounded-xl border border-dark-accent hover:bg-dark-accent transition">
              <h3 className="text-xl font-semibold text-neon-yellow mb-3">{site.nombre}</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <span className="font-medium">📍 Ubicación:</span> {site.location}
                </p>
                <p className="flex items-center">
                  <span className="font-medium">⚙️ Estado:</span> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    site.status === 'Abierto' 
                      ? 'bg-green-800/30 text-green-400' 
                      : 'bg-yellow-800/30 text-yellow-400'
                  }`}>
                    {site.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}