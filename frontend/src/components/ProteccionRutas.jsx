import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/auth.store";

export const ProteccionRutas = ({ rolesPermitidos, redirigir = "/" }) => {
	const { rol, loading } = authStore();

	console.log("ROL proteccion de rutas: ", rol);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				{" "}
				<span className="loading loading-spinner loading-lg"></span>{" "}
			</div>
		);
	}

	if (!rol) return <Navigate to={"/login"} />;

	if (!rolesPermitidos.includes(rol)) {
		return <Navigate to={redirigir} />;
	}

	return <Outlet />;
};
