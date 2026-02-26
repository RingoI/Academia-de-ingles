import { FileUp, UserRoundPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { materialStore } from "../store/material.store";
import TextInput from "../components/TextInput";

function FormularioMaterial({ idUsuario, setAbrirFormulario }) {
	const { obtenerCursosPorDocente, cursosDocente, agregarMaterial } = materialStore();
	const [materialData, setMaterialData] = useState({
		cursoId: null,
		nombreArchivo: "",
		file: null,
		tipo: null,
	});
	const [key, setKey] = useState(() => Date.now());

	useEffect(() => {
		obtenerCursosPorDocente(idUsuario);
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		const status = await agregarMaterial(
			materialData.cursoId,
			idUsuario,
			materialData.file,
			materialData.tipo,
			materialData.nombreArchivo,
		);
		console.log("status: ", status);
		if (status === 201) {
			setAbrirFormulario(false);
			setMaterialData({ cursoId: null, nombreArchivo: "", file: null, tipo: null });
			setKey(() => Date.now());
		}
	}

	return (
		<div className="bg-[#0f1629] w-160 min-h-100 flex flex-col">
			<div className="flex items-center gap-3 border border-slate-700 p-3 rounded-t-xl  ">
				<FileUp className="bg-[#0c354b] text-[#06b6d4] size-10 p-2 rounded-md " />
				<div className="">
					<h1 className="font-semibold text-xl">Subir Nuevo Material</h1>
					<p className="text-sm text-slate-400">Publica recursos educativos para tus alumnos</p>
				</div>
			</div>
			<div className="flex items-center justify-center ">
				<form action="" className="w-full" onSubmit={(e) => handleSubmit(e)}>
					<div className="grid p-5 gap-5 ">
						<div className="flex flex-col">
							<span className="font-semibold text-sm text-slate-400">NOMBRE DEL ARCHIVO</span>
							<input
								placeholder="Ej: Guia de Tiempo Verbales - Unit 1"
								value={materialData.nombreArchivo}
								className="input w-full input-md bg-[#0e1627] border-slate-800 shadow-none"
								onChange={(e) => setMaterialData({ ...materialData, nombreArchivo: e.target.value })}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col">
								<span className="font-semibold text-slate-400 text-sm">CURSO</span>
								<select
									name=""
									id=""
									value={materialData.cursoId ?? ""}
									className="bg-[#0e1527] font-semibold border rounded-md py-2 px-1 border-slate-800 text-slate-300 text-md"
									onChange={(e) => setMaterialData({ ...materialData, cursoId: e.target.value })}
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
							<div className="flex flex-col">
								<span className="font-semibold text-slate-400 text-sm">TIPO DE MATERIAL</span>
								<select
									name=""
									id=""
									value={materialData.tipo ?? ""}
									onChange={(e) => setMaterialData({ ...materialData, tipo: e.target.value })}
									className="bg-[#0e1527] font-semibold border rounded-md py-2 px-1 border-slate-800 text-slate-300 text-md"
								>
									<option value="" disabled>
										Seleccione un tipo de material
									</option>
									<option value={"MATERIAL"}>MATERIAL</option>
									<option value={"TAREA"}>TAREA</option>
									<option value={"EXAMEN"}>EXAMEN</option>
								</select>
							</div>
						</div>
						<div className="flex flex-col">
							<span className="font-semibold text-slate-400 text-sm">SELECCIONA EL ARCHIVO</span>
							<input
								type="file"
								key={key}
								className="file-input bg-[#0e1527]"
								onChange={(e) => setMaterialData({ ...materialData, file: e.target.files[0] })}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end gap-3 border border-slate-700 px-3 py-5.5 rounded-b-xl">
						<button
							className=" px-3 py-1.5 rounded-md text-slate-300 font-semibold cursor-pointer"
							onClick={() => setAbrirFormulario(false)}
							type="button"
						>
							Cancelar
						</button>
						<button className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-cyan-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer">
							Subir Archivo
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormularioMaterial;
