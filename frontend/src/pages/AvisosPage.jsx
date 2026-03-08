import { Plus, Smile } from "lucide-react";
import React, { useEffect, useState } from "react";
import { avisoStore } from "../store/avisos.store";
import AvisoCard from "../components/AvisoCard";
import FormularioAviso from "../components/FormularioAviso";
import { authStore } from "../store/auth.store";

function AvisosPage() {
	const { obtenerAvisos, avisos } = avisoStore();
	const { rol } = authStore();
	const [abrirFormulario, setAbrirFormulario] = useState(false);

	useEffect(() => {
		obtenerAvisos();
	}, []);

	return (
		<div className="h-full w-full relative">
			<FormularioAviso abrirFormulario={abrirFormulario} setAbrirFormulario={setAbrirFormulario} />
			<header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div className="mb-1">
					<h1 className="font-bold text-3xl text-slate-200">Avisos Institucionales</h1>
					<p className="text-slate-400">
						{rol === "ROLE_ALUMNO"
							? "Visualiza los avisos institucionales y de tus cursos"
							: "Crea y gestiona comunicados oficiales para toda la comunidad académica "}
					</p>
				</div>
				<div className={`${rol === "ROLE_ALUMNO" ? "hidden" : "flex"} flex justify-end mb-8`}>
					<button
						className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-indigo-500/50 px-4 py-2 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer flex items-center gap-2"
						onClick={() => setAbrirFormulario(true)}
					>
						<Plus size={16} />
						{rol === "ROLE_ADMIN" ? "Crear Aviso Institucional" : "Crear Aviso a Tus Cursos"}
					</button>
				</div>
			</header>
			<div className="flex flex-col gap-3">
				{avisos.length === 0 ? (
					<div className="h-162 w-full  bg-[#0b1524] flex flex-col items-center justify-center border-3 border-dashed rounded-lg border-slate-400">
						<span className="font-black text-3xl text-slate-400">No tienes avisos por ver</span>
						<Smile className="size-13 mt-3 text-slate-400" />
					</div>
				) : (
					<>
						{avisos.map((av, idx) => (
							<AvisoCard key={idx} aviso={av} />
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default AvisosPage;
