import { ChevronRight, GraduationCap, Info, Layers, Plus, Users } from "lucide-react";
import { cursoStore } from "../../store/cursos.store";
import { useEffect } from "react";
import { authStore } from "../../store/auth.store";
import { useNavigate } from "react-router";

function AlumnoCursos() {
	const { obtenerCursosAlumno, cursosAlumno } = cursoStore();
	const { idUsuario } = authStore();
	const navigate = useNavigate();

	useEffect(() => {
		obtenerCursosAlumno(idUsuario);
	}, []);

	console.log("cursos alumno: ", cursosAlumno);

	return (
		<div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-10">
			<header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<h1 className="text-4xl font-black tracking-tight text-white">Tus Cursos</h1>
					<p className="text-slate-400 mt-2 flex items-center gap-2 font-medium">
						<Info size={16} className="text-blue-500" />
						Información de los cursos a los que perteneces
					</p>
				</div>
			</header>

			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{cursosAlumno.length === 0 ? (
					<div className="col-span-full py-20 text-center bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
						<Layers size={48} className="mx-auto mb-4 opacity-20" />
						<p className="text-slate-500 font-medium">No hay cursos registrados actualmente.</p>
					</div>
				) : (
					cursosAlumno.map((c) => (
						<div
							key={c.id}
							className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 hover:border-blue-500/40 transition-all flex flex-col shadow-2xl group"
						>
							<h2 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">{c.nombre}</h2>

							<div className="space-y-4 mb-2 flex-1">
								<div className="flex items-center gap-4 text-slate-400">
									<div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
										<Layers size={16} />
									</div>
									<span className="text-sm">
										Niveles: <b className="text-slate-200">{c.niveles[0].nombre || "N/A"}</b>
									</span>
								</div>
							</div>

							<div className="flex items-center gap-4 mb-2 text-slate-400">
								<div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
									<GraduationCap size={16} />
								</div>
								<span className="text-sm">
									Staff: <b className="text-slate-200">{c.docentes?.map((d) => d.nombre).join(", ") || "Sin asignar"}</b>
								</span>
							</div>

							<div className="flex items-center gap-4 mb-2 text-slate-400">
								<div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
									<Users size={16} />
								</div>
								<span className="text-sm">
									Cupos:{" "}
									<b className="text-slate-200">
										{c.cantInscriptos} / {c.cupo}
									</b>
								</span>
							</div>

							<div className="pt-6 border-t border-slate-800 flex items-center justify-between">
								<div className="flex flex-col">
									<span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Vigencia</span>
									<span className="text-xs text-slate-300 font-mono">
										{c.fechaInicio} — {c.fechaFin}
									</span>
								</div>
								<button
									onClick={() => navigate(`/cursos/alumno/${c.id}`)}
									className="bg-slate-800 hover:bg-white hover:text-slate-900 p-3 rounded-xl transition-all shadow-lg"
								>
									<ChevronRight size={20} />
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default AlumnoCursos;
