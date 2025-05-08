// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./tailwind.css";

// Componentes de páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentListPage from "./pages/StudentListPage";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import SitesPage from "./pages/SitesPage";
import LorePage from "./pages/LorePage";
import ProfilePage from "./pages/ProfilePage"; // Corregir export en ProfilePage
import UniversalForm from "./components/UniversalForm";
import MainLayout from "./components/MainLayout";

const PrivateRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-8 text-neon-yellow">Cargando...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route element={<PrivateRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/alumnos">
          <Route index element={<StudentListPage />} />
          <Route path=":id" element={<StudentsPage />} />
          <Route path="registro" element={<UniversalForm />} />
        </Route>
        <Route path="/maestros" element={<TeachersPage />} />
        <Route path="/sitios" element={<SitesPage />} />
        <Route path="/lore" element={<LorePage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);