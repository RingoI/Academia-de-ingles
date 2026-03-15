import React, { useEffect } from "react";
import { pagoStore } from "../store/pagos.store";
import { formatearSueldo } from "../utils/funciones";
import { Info } from "lucide-react";

function TablaPagos() {
	const { obtenerPagosAcreditados, pagosAcreditados } = pagoStore();

	useEffect(() => {
		obtenerPagosAcreditados();
	}, []);

	const cabeceras = ["Alumno", "Curso", "Cuota", "Monto", "Fecha de Pago"];

	return (
		<div>
			<div className="flex gap-3 mb-4 items-center bg-[#0a1c31] border border-[#00c3ff31] rounded-lg px-2 py-3">
				<div>
					<Info className="text-[#00c2ff] bg-[#083d5a] size-8 px-1 py-1 rounded-lg" />
				</div>
				<div>
					<h3 className="font-semibold text-[#00c2ff]">INFORMACIÓN IMPORTANTE</h3>
					<p className="text-sm">
						En esta sección solo se muestran los pagos que han sido efectivamente acreditados en el sistema. Los pagos pendientes o
						rechazados deben gestionarse con el alumno en caso de tener un comprobante verídico.
					</p>
				</div>
			</div>
			<div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-md">
				<table className="table w-full bg-[#0b1524] text-slate-200">
					<thead className="bg-[#0e182a] text-slate-300  uppercase">
						<tr>
							{cabeceras.map((c, idx) => (
								<th key={idx} className="px-4 py-3 text-sm font-semibold">
									{c}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-[#121c2e]">
						{pagosAcreditados.map((pago, idx) => (
							<tr key={idx} className="hover:bg-[#132033] transition-colors border-b border-slate-700/30">
								<td className="font-semibold px-4 py-2">{pago.nombreAlumno}</td>
								<td className="px-4 py-2">
									<span className="flex flex-col">
										{pago.nombreCurso} <span className="text-[12px] text-[#058abb] font-bold">{pago.nivel}</span>
									</span>
								</td>
								<td className="px-4 py-2">
									<span className="border border-slate-500 rounded-md px-3 py-0.5 font-semibold text-xs">
										{pago.numeroCuota} / {pago.cantCuotas}
									</span>
								</td>
								<td className="px-4 py-2">
									<span className="bg-green-500/20 text-green-400 border border-green-500/40 rounded-md px-2 text-sm font-medium">
										${formatearSueldo(pago.monto)}
									</span>
								</td>
								<td className="px-4 py-2 text-sm flex flex-col text-slate-300 font-semibold">
									{new Date(pago.fechaPago).toLocaleDateString()}{" "}
									<span className="text-slate-500 text-xs">
										{new Date(pago.fechaPago).toLocaleTimeString("es-AR", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TablaPagos;
