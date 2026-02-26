import React, { useState } from "react";
import TablaMaterial from "../components/TablaMaterial";
import { FileStack, FileUp, Users } from "lucide-react";
import FormularioMaterial from "../components/FormularioMaterial";
import { authStore } from "../store/auth.store";

function ExamenesPage() {
	const [abrirFormulario, setAbrirFormulario] = useState(false);
	const { idUsuario, rol } = authStore();

	return (
		<div className="h-full w-full relative">
			<div>
				<h1 className="font-semibold text-3xl">Gestión de Material</h1>
				<p className="text-slate-400">Administra los archivos, exámenes y tareas para tus grupos</p>
			</div>
			<div className={`${abrirFormulario ? "fixed inset-0 ml-60" : "hidden"} z-10 flex items-center justify-center bg-black/50`}>
				<FormularioMaterial idUsuario={idUsuario} setAbrirFormulario={setAbrirFormulario} />
			</div>
			<div className="mt-10 flex flex-col gap-2">
				<div className="flex justify-between">
					<div className="flex gap-2 items-center">
						<FileStack className="text-[#06b6d4] bg-[#0c1224] size-8 p-1 rounded-xl" />
						<h2 className="font-semibold text-xl">Material y Exámenes</h2>
					</div>
					<button
						className="bg-[#06b6d4] flex items-center gap-2 shadow-md transition-all duration-300 hover:shadow-cyan-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer"
						onClick={() => setAbrirFormulario(!abrirFormulario)}
					>
						<FileUp />
						Subir Material
					</button>
				</div>
				<TablaMaterial idUsuario={idUsuario} rol={rol} />
			</div>
		</div>
	);
}

export default ExamenesPage;
