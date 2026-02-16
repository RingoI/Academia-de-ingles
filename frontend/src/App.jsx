import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ProteccionRutas } from "./components/ProteccionRutas";
import DashboardPage from "./pages/DashboardPage";
import UsuariosPage from "./pages/UsuariosPage";
import CursosPage from "./pages/CursosPage";
import PagosPage from "./pages/PagosPage";
import ExamenesPage from "./pages/ExamenesPage";
import Layout from "./components/Layout";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route element={<ProteccionRutas rolesPermitidos={["ROLE_ADMIN"]} />}>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/usuarios" element={<UsuariosPage />} />
					<Route path="/cursos" element={<CursosPage />} />
					<Route path="/pagos" element={<PagosPage />} />
					<Route path="/examenes" element={<ExamenesPage />} />
				</Route>
			</Route>

			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
