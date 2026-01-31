import { useAuth } from "./Context/AuthContext";
import LoginPage from "./Pages/LoginPage";

function App() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <h2>Cargando aplicación...</h2>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Academia</h1>
      <p>Usuario: {user?.username}</p>
      <p>Rol: {user?.role}</p>
    </div>
  );
}

export default App;
