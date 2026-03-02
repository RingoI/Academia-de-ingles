import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { materialStore } from "../../store/material.store";
import { cursoStore } from "../../store/cursos.store";
import { ArrowLeft, BookOpen, CheckCircle, File, FileDown } from "lucide-react";

function DocenteCursoDetalle() {
	const { id } = useParams();
	const { obtenerArchivosPorCurso, archivosCurso, descargarArchivos } = materialStore();
	const { obtenerCursoPorId, cursoPorId } = cursoStore();
	const navigate = useNavigate();

	console.log("ID: ", id);

	useEffect(() => {
		obtenerCursoPorId(id);
		obtenerArchivosPorCurso(id);
	}, []);

	console.log("Curso por id: ", cursoPorId);

	return (
		<div>
			<header className="max-w-7xl mx-auto mb-10">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-inner">
					<div className="flex items-center gap-6">
						<button
							onClick={() => navigate(-1)}
							className="group p-3 bg-slate-800 hover:bg-blue-600 rounded-2xl transition-all duration-300 shadow-lg"
						>
							<ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
						</button>
						<div>
							<h1 className="text-4xl font-black text-white tracking-tight">{cursoPorId?.nombre}</h1>
							<p className="text-slate-400 flex items-center gap-2 mt-1 italic">
								<BookOpen size={14} /> Archivos del Curso
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto gap-10">
				<section className="bg-slate-900/50 rounded-2xl border  border-slate-800 p-6 shadow-2xl overflow-y-scroll h-130 flex flex-col transition-all hover:border-slate-700/50">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 ">
							<File size={22} />
						</div>
						<h2 className="text-xl font-bold tracking-tight text-white">Archivos subidos por el Docente</h2>
					</div>
					<div className="flex flex-col gap-5">
						{archivosCurso.map((arc, idx) => (
							<div key={idx} className="border border-slate-800 p-6 bg-slate-900/50 rounded-2xl grid grid-cols-4 gap-5 items-center">
								<span className="text-lg font-black ">{arc.nombre}</span>
								<span className="font-semibold w-30">{arc.fechaSubida}</span>
								{arc.tipo === "MATERIAL" ? (
									<span className="bg-[#818df851] w-30 text-center  px-2 rounded-xl py-1 font-semibold text-[#818df8ef]">
										MATERIAL
									</span>
								) : (
									<>
										{arc.tipo === "TAREA" ? (
											<span className="bg-[#06b5d446] w-30 text-center px-3 py-1 rounded-xl font-semibold text-[#06b6d4]">
												TAREA
											</span>
										) : (
											<span className="bg-[#db80363e] px-3 rounded-xl text-center w-30 py-1 font-semibold text-[#db7f36]">
												EXAMEN
											</span>
										)}
									</>
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
				<section className="bg-slate-900/50 rounded-2xl border mt-10 border-slate-800 p-6 shadow-2xl -h-130 overflow-y-scroll flex flex-col transition-all hover:border-slate-700/50">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2.5 bg-emerald-500/10 rounded-xl  border border-emerald-500/20 text-emerald-400">
							<CheckCircle size={22} />
						</div>
						<h2 className="text-xl font-bold tracking-tight text-white">Alumnos Inscritos</h2>
					</div>
					<div className="flex flex-col gap-4">
						{cursoPorId?.alumnos.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-2xl">
								<p className="text-sm font-medium">Sin alumnos vinculados</p>
							</div>
						) : (
							cursoPorId?.alumnos.map((alumno, index) => (
								<div
									key={index}
									className="flex items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 group transition-all"
								>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
											{alumno.nombre?.charAt(0) || "A"}
										</div>
										<span className="text-slate-200 font-medium">{alumno.nombre || alumno}</span>
									</div>
								</div>
							))
						)}
					</div>
				</section>
			</main>
		</div>
	);
}

export default DocenteCursoDetalle;
