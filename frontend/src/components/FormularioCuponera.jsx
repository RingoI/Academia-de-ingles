import { UserRoundPlus, WalletCards, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cursoStore } from "../store/cursos.store";
import { pagoStore } from "../store/pagos.store";

function FormularioCuponera({ setAbrirCuponera, datosAlumno = {} }) {
	const { obtenerCursoPorAlumnoId, cursosAlumnoId } = cursoStore();
	const { generarCuponera, loadingCuponera } = pagoStore();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState(null);
	const [data, setData] = useState({
		alumno_id: datosAlumno?.id,
		curso_id: null,
	});

	console.log("cursos alumno: ", cursosAlumnoId);

	useEffect(() => {
		obtenerCursoPorAlumnoId(datosAlumno?.id);
	}, [datosAlumno?.id]);

	useEffect(() => {
		const timer = setTimeout(() => setSuccess(""), 0);
		return () => clearTimeout(timer);
	}, [datosAlumno?.id]);

	useEffect(() => {
		const timer = setTimeout(() => setData({ ...data, curso_id: null }), 0);
		return () => clearTimeout(timer);
	}, [datosAlumno?.id]);

	useEffect(() => {
		if (error !== null) {
			const timer = setTimeout(() => {
				setError(null);
				setSuccess("");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [error]);

	async function handleSubmit(e) {
		e.preventDefault();
		const status = await generarCuponera({
			alumno_id: datosAlumno?.id,
			curso_id: data.curso_id,
		});

		console.log("Estatus: ", status);

		if (status === 201) {
			setSuccess("Cuponera creada correctamente.");
			setError(false);
		} else if (status === 409) {
			setSuccess("El alumno ya tiene una cuponera en el curso indicado.");
			setError(true);
		} else if (status === 500) {
			setSuccess("Ocurrió un error al generar la cuponera.");
			setError(true);
		}
	}

	return (
		<div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
			<div className="flex items-center justify-between gap-3 border-b border-slate-700 p-5 bg-slate-900/50">
				<div className="flex items-center gap-4">
					<WalletCards className="bg-[#0c354b] text-[#06b6d4] size-12 p-2.5 rounded-xl" />
					<div>
						<h1 className="font-bold text-xl text-white">Generar Cuponera para {datosAlumno.nombre}</h1>
						<p className="text-sm text-slate-400">Seleccione el curso del alumno para generar su cuponera</p>
					</div>
				</div>
				<button className="text-slate-500 hover:text-white transition-colors p-2" onClick={() => setAbrirCuponera(false)}>
					<X size={24} />
				</button>
			</div>
			<div className={`toast ${error === null ? "hidden" : "flex"} `}>
				<div className={`alert ${error ? "alert-error" : "alert-success"} `}>
					<span>{success} </span>
				</div>
			</div>
			<div className="min-h-24 px-5 py-2">
				<form action="" onSubmit={(e) => handleSubmit(e)}>
					<span className="font-black text-slate-200 ">Selecciona el curso correspondiente</span>
					<select
						name=""
						id=""
						className="border-slate-500 border px-3 rounded-lg w-full h-10 mt-2 text-slate-300 font-semibold bg-[#0f172a]"
						onChange={(e) => setData({ ...data, curso_id: parseInt(e.target.value) })}
					>
						<option>Selecciona el curso</option>
						{cursosAlumnoId.map((c, idx) => (
							<option key={idx} value={c.id}>
								{c.nombre}
							</option>
						))}
					</select>
					<div className="flex items-end w-full justify-end py-3">
						<button className="bg-[#06b6d4] text-black px-3 py-1 rounded-lg font-semibold cursor-pointer">
							{loadingCuponera ? <span className="loading loading-dots loading-md"></span> : "Generar Cuponera"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormularioCuponera;
