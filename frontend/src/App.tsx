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
      </Routes>
    </AppLayout>
  );
}

export default App;
