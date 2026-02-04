import { Routes, Route } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import LoginPage from "./Pages/LoginPage";
import AppLayout from "./Layout/AppLayout";
import CursosPage from "./Pages/CursoPage";
import CursoDetallePage from "./Pages/CursoDetallePage";
import CrearCursoPage from "./Pages/CrearCursoPage";
import EditarCursoPage from "./Pages/EditarCursosPage";
import EditarAlumnoPage from "./Pages/EditarAlumnoPage";
import AlumnoDetallePage from "./Pages/DetalleAlumnoPage";
import CrearAlumnoPage from "./Pages/CrearAlumnoPage";
import AlumnoPage from "./Pages/AlumnoPage";

import EditarDocentePage from "./Pages/EditarDocentePage";
import DetalleDocentePage from "./Pages/DetalleDocentePage";
import CrearDocentePage from "./Pages/CrearDocentePage";
import DocentePage from "./Pages/DocentePage";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!isAuthenticated) return <LoginPage />;

  return (
    <AppLayout>
      <Routes>
        {/* ================= CURSOS ================= */}
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos/:id" element={<CursoDetallePage />} />
        <Route path="/cursos/nuevo" element={<CrearCursoPage />} />
        <Route path="/cursos/:id/editar" element={<EditarCursoPage />} />

        {/* ================= ALUMNOS ================= */}
        <Route path="/alumnos" element={<AlumnoPage />} />
        <Route path="/alumnos/nuevo" element={<CrearAlumnoPage />} />
        <Route path="/alumnos/:id" element={<AlumnoDetallePage />} />
        <Route path="/alumnos/:id/editar" element={<EditarAlumnoPage />} />

        {/* ================= DOCENTES ================= */}
        <Route path="/docentes" element={<DocentePage />} />
        <Route path="/docentes/nuevo" element={<CrearDocentePage />} />
        <Route path="/docentes/:id" element={<DetalleDocentePage />} />
        <Route path="/docentes/:id/editar" element={<EditarDocentePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
