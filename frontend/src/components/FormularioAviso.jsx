import { useEffect, useState } from "react";
import { avisoStore } from "../store/avisos.store";
import { authStore } from "../store/auth.store";
import { materialStore } from "../store/material.store";

function FormularioAviso({ abrirFormulario, setAbrirFormulario }) {
	const { crearAviso } = avisoStore();
	const { obtenerCursosPorDocente, cursosDocente } = materialStore();
	const { rol, idUsuario } = authStore();
	const [avisoData, setAvisoData] = useState({
		titulo: "",
		cuerpo: "",
		institucional: rol === "ROLE_ADMIN" ? true : false,
		curso_id: null,
	});

	useEffect(() => {
		obtenerCursosPorDocente(idUsuario);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		crearAviso(avisoData);
		setAbrirFormulario(false);
	}

	return (
		<div
			className={`${abrirFormulario ? "fixed" : "hidden"} inset-0 bg-slate-950/20 backdrop-blur-sm flex items-center justify-center p-4 z-50`}
		>
			<div className="bg-[#0b1524] w-200 min-h-100 p-5 rounded-xl">
				<div>
					<h1 className="font-black text-2xl">Crear un Nuevo Aviso Institucional</h1>
					<p className="text-slate-400">Rellene los campos para crear un nuevo aviso institucional</p>
				</div>

				<form action="" className="mt-5 flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
					<div className="w-full flex flex-col gap-1">
						<span className="font-black text-slate-200">Titulo</span>
						<input
							type="text"
							className="h-10 border px-3 border-slate-500 rounded-lg"
							placeholder="Ingrese el titulo del aviso..."
							onChange={(e) => setAvisoData({ ...avisoData, titulo: e.target.value })}
							required
						/>
					</div>

					<fieldset className="flex flex-col gap-1">
						<span className="font-black text-slate-200">Cuerpo del Aviso</span>
						<textarea
							maxLength={300}
							className="textarea h-20 bg-transparent border border-slate-500 w-full max-h-30"
							placeholder="Ingrese el cuerpo del aviso..."
							onChange={(e) => setAvisoData({ ...avisoData, cuerpo: e.target.value })}
							required
						></textarea>
						<div className="label">Max. caracteres: 300</div>
					</fieldset>

					<div className={`${rol === "ROLE_DOCENTE" ? "flex" : "hidden"}  flex-col gap-1`}>
						<span className="font-black text-slate-200">Curso dirigido</span>
						<select
							name=""
							id=""
							value={avisoData.curso_id ?? ""}
							className="bg-[#0b1524] font-semibold border rounded-md py-2 px-1 border-slate-500 text-slate-300 text-md"
							onChange={(e) => setAvisoData({ ...avisoData, curso_id: e.target.value })}
						>
							<option value="" disabled>
								Seleccione un curso
							</option>
							{cursosDocente.map((c, idx) => (
								<option key={idx} value={c.id}>
									{c.nombre}
								</option>
							))}
						</select>
					</div>

					<div className="h-full flex items-center justify-end">
						<button
							type="button"
							className=" text-slate-400 h-10 w-40  font-black cursor-pointer"
							onClick={() => setAbrirFormulario(false)}
						>
							Cancelar
						</button>
						<button type="submit" className="bg-[#0ea1e3] h-10 w-40 rounded-xl font-black cursor-pointer">
							Crear Aviso
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormularioAviso;
