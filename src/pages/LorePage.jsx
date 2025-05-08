import React from 'react';
export default function LorePage() {
  return (
    <div className="min-h-screen bg-dark-primary text-gray-100">
      <header className="bg-dark-secondary py-6 border-b border-dark-accent">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-neon-yellow">📜 Historia Institucional</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="bg-dark-secondary rounded-xl p-8 border border-dark-accent shadow-2xl">
          <h2 className="text-3xl font-bold text-neon-yellow mb-6">
            Nuestra Historia y Tradición
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Fundada en 1985, nuestra institución ha sido pionera en la formación de profesionales 
            destacados en el área tecnológica. Con más de 35 años de experiencia, combinamos 
            tradición académica con innovación constante...
          </p>
        </section>
      </main>
    </div>
  );
}