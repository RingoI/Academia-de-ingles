import { Routes, Route } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import LoginPage from "./Pages/LoginPage";
import AppLayout from "./Layout/AppLayout";
import CursosPage from "./Pages/CursoPage";
import CursoDetallePage from "./Pages/CursoDetallePage";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!isAuthenticated) return <LoginPage />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos/:id" element={<CursoDetallePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
