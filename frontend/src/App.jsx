import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ProteccionRutas } from "./components/ProteccionRutas";
import SoloAdmin from "./pages/SoloAdmin";

function App() {
	return (
		<Routes>
			<Route element={<ProteccionRutas rolesPermitidos={["ROLE_ADMIN"]} />}>
				<Route path="/soloadmin" element={<SoloAdmin />} />
			</Route>

			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
