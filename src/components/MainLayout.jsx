import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer con estilos mejorados */}
      <footer className="bg-dark-secondary/90 backdrop-blur-md border-t border-neon-yellow/20 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;