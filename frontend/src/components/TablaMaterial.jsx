import { useEffect } from "react";
import { materialStore } from "../store/material.store";

function TablaMaterial({ idUsuario }) {
	const { obtenerEntregasPorDocente, materiales } = materialStore();

	useEffect(() => {
		obtenerEntregasPorDocente(idUsuario);
	}, []);

	const cabeceras = ["", "Nombre Curso", "Nombre Archivo", "Tipo", "Fecha de Subida"];

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
							<th className="font-normal">{m.nombreArchivo}</th>
							<th>
								{m.tipo === "MATERIAL" ? (
									<span className="bg-[#818df851] px-2 rounded-xl text-[#818df8ef]">MATERIAL</span>
								) : (
									<span>EXÁMEN</span>
								)}
							</th>
							<th>{m.fechaSubida}</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaMaterial;
