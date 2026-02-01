import { useAuth } from "./Context/AuthContext";
import LoginPage from "./Pages/LoginPage";
import AppLayout from "./Layout/AppLayout";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h2 className="text-center mt-10">Cargando aplicación...</h2>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AppLayout>
      <h2 className="text-2xl font-bold mb-4">Bienvenido a la Academia</h2>
      <p>Seleccioná una opción del menú</p>
    </AppLayout>
  );
}

export default App;
