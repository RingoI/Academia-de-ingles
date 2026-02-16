import { useEffect } from "react";
import { usuarioStore } from "../store/usuarios.store";

function TablaDocentes() {
	const { docentes, obtenerDocentes } = usuarioStore();

	useEffect(() => {
		obtenerDocentes();
	}, []);

	console.log("Docentes:  ", docentes);

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
					{docentes.map((d, idx) => (
						<tr>
							<th>{idx + 1}</th>
							<td>{d.nombre}</td>
							<td>{d.email}</td>
							<td>{d.direccion}</td>
							<td>{d.dni}</td>
							<td>{d.activo ? "Activo" : "Desactivado"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaDocentes;
