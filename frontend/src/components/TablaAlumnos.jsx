import React, { useEffect } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { CheckCircle2 } from "lucide-react";

function TablaAlumnos() {
	const { alumnos, obtenerAlumnos } = usuarioStore();

	useEffect(() => {
		obtenerAlumnos();
	}, []);

	console.log("Alumnos:  ", alumnos);

	const cabecera = ["", "Nombre", "Email", "Direccion", "DNI", "Estado"];

	return (
		<div className="overflow-x-auto">
			<table className="table rounded-lg overflow-hidden">
				<thead className="bg-[#0d1526]">
					<tr>
						{cabecera.map((c) => (
							<th>{c}</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-[#0c1224]">
					{alumnos.map((a, idx) => (
						<tr>
							<th>{idx + 1}</th>
							<td>{a.nombre}</td>
							<td>{a.email}</td>
							<td>{a.direccion}</td>
							<td>{a.dni}</td>
							<td>
								{a.activo ? (
									<div className="flex items-center gap-1">
										<CheckCircle2 className="size-4 text-green-500" />
										<span className="text-sm">Activo</span>
									</div>
								) : (
									"Desactivado"
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaAlumnos;
