import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { materialStore } from "../../store/material.store";
import { cursoStore } from "../../store/cursos.store";
import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle, File, Users, FileDown } from "lucide-react";
import ForoCurso from "../../components/foro/ForoCurso";

function DocenteCursoDetalle() {
	const { id } = useParams();
	const { obtenerArchivosPorCurso, archivosCurso, descargarArchivos } = materialStore();
	const { obtenerCursoPorId, cursoPorId } = cursoStore();
	const navigate = useNavigate();
	const [tabActiva, setTabActiva] = useState("materiales");

	console.log("ID: ", id);

	useEffect(() => {
		obtenerCursoPorId(id);
		obtenerArchivosPorCurso(id);
	}, []);

	console.log("Curso por id: ", cursoPorId);

	return (
		<div>

			{/* sección del nombre del curso que comprende hasta la línea divisoria */}
			<header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div className="mb-1">
					<h1 className="font-semibold text-3xl text-slate-400">
						{cursoPorId?.nombre}
					</h1>
					<p className="text-slate-400">
						Contenidos del curso
					</p>
				</div>
			</header>

			<div className="border-b border-slate-400 mt-2 mb-2"></div>

			{/* pestañas para cambiar entre materiales, foro y alumnos */}
			<div className="flex gap-6 border-b border-slate-700 mt-6 mb-10">

				<button
					onClick={() => setTabActiva("materiales")}
					className={`pb-2 font-semibold ${tabActiva === "materiales"
						? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
						: "text-slate-400 hover:text-white"}`}
				>
					Materiales
				</button>

				<button
					onClick={() => setTabActiva("foro")}
					className={`pb-2 font-semibold ${tabActiva === "foro"
						? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
						: "text-slate-400 hover:text-white"}`}
				>
					Foro
				</button>

				<button
					onClick={() => setTabActiva("alumnos")}
					className={`pb-2 font-semibold ${tabActiva === "alumnos"
						? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
						: "text-slate-400 hover:text-white"}`}
				>
					Alumnos
				</button>

				</div>


			<main className="max-w-7xl mx-auto gap-10">

				{/* TAB MATERIALES */}
				{tabActiva === "materiales" && (
						<section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 shadow-2xl overflow-y-scroll h-130 flex flex-col transition-all hover:border-slate-700/50">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 ">
							<File size={22} />
							</div>
							<h2 className="text-xl font-bold tracking-tight text-slate-400">
							Archivos subidos por el docente
							</h2>
						</div>

						<div className="flex flex-col gap-5">
							{archivosCurso.map((arc, idx) => (
							<div
								key={idx}
								className="border border-slate-800 p-6 bg-slate-900/50 rounded-2xl grid grid-cols-4 gap-5 items-center"
							>
								<span className="text-lg font-black">{arc.nombre}</span>
								<span className="font-semibold w-30">{arc.fechaSubida}</span>

								{arc.tipo === "MATERIAL" ? (
								<span className="bg-[#818df851] w-30 text-center px-2 rounded-xl py-1 font-semibold text-[#818df8ef]">
									MATERIAL
								</span>
								) : arc.tipo === "TAREA" ? (
								<span className="bg-[#06b5d446] w-30 text-center px-3 py-1 rounded-xl font-semibold text-[#06b6d4]">
									TAREA
								</span>
								) : (
								<span className="bg-[#db80363e] px-3 rounded-xl text-center w-30 py-1 font-semibold text-[#db7f36]">
									EXAMEN
								</span>
								)}

								<div
								className="flex gap-1 cursor-pointer items-center bg-emerald-700 w-40 justify-center py-1.5 rounded-xl"
								onClick={() => descargarArchivos(arc.id, arc.nombre)}
								>
								<span className="font-black">Descargar</span>
								<FileDown />
								</div>
							</div>
							))}
						</div>
						</section>
				)}

				
				{/* TAB FORO */}
				{tabActiva === "foro" && (
					<div>
						{cursoPorId && (
							<ForoCurso cursoId={cursoPorId.id} />
						)}
					</div>
				)}

				{/* TAB ALUMNOS */}
				{tabActiva === "alumnos" && (

				<div className="mt-4">

					{cursoPorId?.alumnos.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 text-slate-500">
						<Users size={70} className="mb-4 opacity-30" />
						<p className="text-sm font-medium">Aún no hay alumnos en este curso</p>
					</div>
					) : (

					<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
						{cursoPorId?.alumnos.map((alumno, index) => (
						<div
							key={index}
							className="bg-slate-800/40 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition"
						>
							{alumno.nombre}
						</div>
						))}
					</div>
					)}
				</div>
				)}

				</main>

		</div>
	);
}

export default DocenteCursoDetalle;
