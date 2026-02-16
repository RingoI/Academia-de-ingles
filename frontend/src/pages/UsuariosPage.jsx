import React from "react";
import TablaAlumnos from "../components/TablaAlumnos";
import { ShieldUser, Users } from "lucide-react";
import TablaDocentes from "../components/TablaDocentes";

function UsuariosPage() {
	return (
		<div>
			<div>
				<h1 className="font-semibold text-3xl">Gestión de Usuarios</h1>
				<p className="text-slate-400">Administra el acceso de alumnos y docentes.</p>
			</div>
			<div className="mt-5 flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<Users className="text-[#06b6d4] bg-[#0c1224] size-8 p-1 rounded-xl" />
					<h2 className="font-semibold text-xl">Alumnos Registrados</h2>
				</div>
				<TablaAlumnos />
			</div>
			<div className="mt-5 flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<ShieldUser className="text-[#818cf8] bg-[#0c1224] size-8 p-1 rounded-xl" />
					<h2 className="font-semibold text-xl">Docentes Registrados</h2>
				</div>
				<TablaDocentes />
			</div>
		</div>
	);
}

export default UsuariosPage;
