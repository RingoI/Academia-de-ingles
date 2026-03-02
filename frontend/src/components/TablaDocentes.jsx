import { useEffect, useState } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { Ban, CheckCircle2, SquarePen, XCircle } from "lucide-react";
import FormularioDocentes from "./FormularioDocentes";

function TablaDocentes() {
	const { docentes, obtenerDocentes, modificarDocente } = usuarioStore();
	const [editarDocente, setEditarDocente] = useState(false);
	const [datosDocente, setDatosDocente] = useState({});

	useEffect(() => {
		obtenerDocentes();
	}, []);

	console.log("Docentes:  ", docentes);

	const cabecera = ["", "Nombre", "Email", "Direccion", "CUIL", "Estado", "Acciones"];

	return (
		<div className="overflow-x-auto pb-5">
			<div className={`${editarDocente ? "fixed inset-0 ml-60" : "hidden"} z-10 flex items-center justify-center bg-black/50`}>
				<FormularioDocentes
					key={datosDocente.id}
					abrirFormularioDocentes={editarDocente}
					setAbrirFormularioDocentes={setEditarDocente}
					values={datosDocente}
				/>
			</div>
			<table className="table rounded-lg overflow-hidden">
				<thead className="bg-[#0d1526]">
					<tr>
						{cabecera.map((c) => (
							<th key={c}>{c}</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-[#0c1224]">
					{docentes.map((d, idx) => (
						<tr key={d.id}>
							<th>{idx + 1}</th>
							<td>{d.nombre}</td>
							<td>{d.email}</td>
							<td>{d.direccion}</td>
							<td>{d.cuit}</td>
							<td>
								{d.estado ? (
									<div className="flex items-center gap-1">
										<CheckCircle2 className="size-4 text-green-500" />
										<span className="text-sm">Activo</span>
									</div>
								) : (
									<div className="flex items-center gap-1">
										<XCircle className="size-4 text-red-500" />
										<span className="text-sm font-semibold">Desactivado</span>
									</div>
								)}
							</td>
							<td className="flex gap-2 text-slate-300">
								{d.estado ? (
									<span>
										<Ban
											className="size-5 cursor-pointer hover:text-red-500"
											onClick={() => modificarDocente(d.id, { ...d, estado: false })}
										/>
									</span>
								) : (
									<span>
										<CheckCircle2
											className="size-5 cursor-pointer hover:text-green-500"
											onClick={() => modificarDocente(d.id, { ...d, estado: true })}
										/>
									</span>
								)}
								<span>
									<SquarePen
										className="size-5 cursor-pointer"
										onClick={() => {
											setEditarDocente(!editarDocente);
											setDatosDocente(d);
										}}
									/>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaDocentes;
