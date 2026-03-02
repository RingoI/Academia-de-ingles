import { useEffect } from "react";
import { materialStore } from "../store/material.store";
import { FileDown, FileQuestionMark, LibraryBig, Newspaper, Trash2 } from "lucide-react";

function TablaMaterial({ idUsuario, rol }) {
	const { obtenerEntregasPorDocente, materiales, descargarArchivos, isDownloading, eliminarArchivo } = materialStore();

	useEffect(() => {
		obtenerEntregasPorDocente(idUsuario);
	}, []);

	const cabeceras = ["", "Nombre Curso", "Nombre Archivo", "Tipo", "Fecha de Subida", "Acciones"];

	function handleEliminar(id) {
		if (window.confirm("¿Estás seguro de eliminar el archivo?")) {
			eliminarArchivo(id, idUsuario);
		}
	}

	return (
		<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
			<table className="table">
				<thead className="bg-[#0d1526]">
					<tr>
						{cabeceras.map((c) => (
							<th>{c}</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-[#0c1224]">
					{materiales.map((m, idx) => (
						<tr key={idx}>
							<th>{idx + 1}</th>
							<th>{m.cursoNombre}</th>
							<th className="font-normal">
								<div className="flex gap-2">
									{m.tipo === "MATERIAL" ? (
										<LibraryBig className="bg-[#818df851] text-[#818df8ef] size-7 p-1 rounded-lg " />
									) : (
										<>
											{m.tipo === "TAREA" ? (
												<Newspaper className="bg-[#06b5d446] text-[#06b6d4] size-7 p-1 rounded-lg " />
											) : (
												<FileQuestionMark className="bg-[#db80363e] text-[#db7f36] size-7 p-1 rounded-lg " />
											)}
										</>
									)}
									{m.nombre}
								</div>
							</th>
							<th>
								{m.tipo === "MATERIAL" ? (
									<span className="bg-[#818df851] px-2 rounded-xl text-[#818df8ef]">MATERIAL</span>
								) : (
									<>
										{m.tipo === "TAREA" ? (
											<span className="bg-[#06b5d446] px-3 rounded-xl text-[#06b6d4]">TAREA</span>
										) : (
											<span className="bg-[#db80363e] px-3 rounded-xl text-[#db7f36]">EXAMEN</span>
										)}
									</>
								)}
							</th>
							<th>{m.fechaSubida}</th>
							<th className="flex gap-2">
								<div>
									{isDownloading ? (
										<span className="loading loading-spinner loading-sm"></span>
									) : (
										<FileDown
											className="size-6 cursor-pointer hover:text-green-500"
											onClick={() => descargarArchivos(m.id, m.nombre)}
										/>
									)}
								</div>
								{rol === "ROLE_ALUMNO" ? (
									""
								) : (
									<div>
										<Trash2 className="cursor-pointer hover:text-red-500" onClick={() => handleEliminar(m.id)} />
									</div>
								)}
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaMaterial;
