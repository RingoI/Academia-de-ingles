import AdminCursos from "./cursos/AdminCursos";
import { authStore } from "../store/auth.store.js";
import AlumnoCursos from "./cursos/AlumnoCursos";

function CursosPage() {
	const { rol } = authStore();

	return <>{rol === "ROLE_ADMIN" ? <AdminCursos /> : rol === "ROLE_ALUMNO" ? <AlumnoCursos /> : <AdminCursos />}</>;
}

export default CursosPage;
