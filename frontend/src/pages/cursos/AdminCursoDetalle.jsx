import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CursosService } from "../../utils/CursosService";
import {
  Search,
  ArrowLeft,
  CheckCircle,
  Users,
  UserPlus,
  BookOpen,
  Trash2,
  X,
} from "lucide-react";
import ForoCurso from "../../components/foro/ForoCurso";

function AdminCursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [alumnosSinCurso, setAlumnosSinCurso] = useState([]);
  const [docentesDisponibles, setDocentesDisponibles] = useState([]);
  const [tabActiva, setTabActiva] = useState("alumnos");
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [busquedaInscritos, setBusquedaInscritos] = useState("");
  const [busquedaDocentesAsignados, setBusquedaDocentesAsignados] =
    useState("");
  const cupoCompleto =
    curso?.alumnos && curso?.cupo ? curso.alumnos.length >= curso.cupo : false;

  const docentesFiltrados = (docentesDisponibles || []).filter((d) =>
    d.nombre?.toLowerCase().includes(busquedaDocente.toLowerCase()),
  );

  const alumnosFiltrados = (alumnosSinCurso || []).filter((a) =>
    a.nombre?.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const fetchData = async () => {
    try {
      const [cursoData, alumnosData, docentesData] = await Promise.all([
        CursosService.obtenerPorId(id),
        CursosService.getAlumnosSinCurso(),
        CursosService.getDocentes(),
      ]);
      setCurso(cursoData);
      setAlumnosSinCurso(alumnosData);
      setDocentesDisponibles(docentesData);
    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const manejarAsignarAlumno = async (alumnoId) => {
    try {
      await CursosService.asignarAlumno(id, alumnoId);
      await fetchData(); // Refrescar todo para mover de una lista a otra
    } catch (error) {
      alert("No se pudo asignar al alumno.");
    }
  };

  const manejarDesvincularAlumno = async (alumnoId) => {
    if (!window.confirm("¿Quitar a este alumno del curso?")) return;
    try {
      await CursosService.desvincularAlumno(id, alumnoId);
      await fetchData();
    } catch (error) {
      alert("Error al desvincular alumno.");
    }
  };

  const manejarAsignarDocente = async (docenteId) => {
    try {
      await CursosService.asignarDocente(id, docenteId);
      await fetchData();
    } catch (error) {
      alert("No se pudo asignar al docente.");
    }
  };

  const manejarDesvincularDocente = async (docenteId) => {
    if (!window.confirm("¿Quitar a este docente del curso?")) return;
    try {
      await CursosService.desvincularDocente(id, docenteId);
      await fetchData();
    } catch (error) {
      alert("Error al desvincular docente.");
    }
  };

  const alumnosInscritosFiltrados = curso?.alumnos?.filter((a) =>
    a.nombre?.toLowerCase().includes(busquedaInscritos.toLowerCase()),
  );

  const docentesDisponiblesFiltrados = docentesDisponibles
    .filter((d) => !curso?.docentes?.some((cd) => cd.id === d.id))
    .filter((d) =>
      d.nombre?.toLowerCase().includes(busquedaDocente.toLowerCase()),
    );

  const docentesAsignadosFiltrados = curso?.docentes?.filter((d) =>
    d.nombre?.toLowerCase().includes(busquedaDocentesAsignados.toLowerCase()),
  );

  const cardContainer =
    "bg-slate-900/50 rounded-2xl border border-slate-800 p-6 shadow-2xl h-[480px] flex flex-col transition-all hover:border-slate-700/50";
  const scrollArea = "flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-slate-400 font-medium animate-pulse">
            Cargando gestión...
          </p>
        </div>
      </div>
    );

  if (!curso)
    return (
      <div className="p-10 text-white text-center">Curso no encontrado</div>
    );
  return (
    <>
      {/* HEADER */}
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="mb-1">
          <h1 className="font-semibold text-3xl text-slate-400">
            {curso.nombre}
          </h1>

          <p className="text-slate-400">Gestión del curso</p>
        </div>

        {/* CUPO */}
        <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              Cupo
            </p>

            <p className="text-lg font-mono font-bold text-white">
              {curso.alumnos?.length}
              <span className="text-slate-500 text-sm"> / {curso.cupo}</span>
            </p>
          </div>

          <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
            <Users size={18} />
          </div>
        </div>
      </header>

      <div className="border-b border-slate-400 mt-2 mb-6"></div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-slate-700 mt-6 mb-8">
        <button
          onClick={() => setTabActiva("alumnos")}
          className={`pb-2 font-semibold ${
            tabActiva === "alumnos"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Alumnos
        </button>

        <button
          onClick={() => setTabActiva("docentes")}
          className={`pb-2 font-semibold ${
            tabActiva === "docentes"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Docentes
        </button>

        <button
          onClick={() => setTabActiva("foro")}
          className={`pb-2 font-semibold ${
            tabActiva === "foro"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Foro
        </button>
      </div>

      <main className="max-w-7xl mx-auto gap-10">
        {/* TAB ALUMNOS */}
        {tabActiva === "alumnos" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* --- 1. ALUMNOS INSCRITOS --- */}
            <section className={cardContainer}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle size={22} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Alumnos inscritos
                </h2>
              </div>

              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar alumno inscrito..."
                  value={busquedaInscritos}
                  onChange={(e) => setBusquedaInscritos(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/40 outline-none text-white"
                />
              </div>

              <div className={scrollArea}>
                {alumnosInscritosFiltrados?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-2xl">
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                      <Users size={80} className="mb-3 opacity-30" />
                      <p className="text-sm font-medium">
                        Aún no hay estudiantes en este curso
                      </p>
                    </div>
                  </div>
                ) : (
                  alumnosInscritosFiltrados?.map((alumno) => (
                    <div
                      key={alumno.id}
                      className="flex items-center justify-between bg-slate-800/30 p-2.5 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-slate-200 font-medium">
                          {alumno.nombre || alumno}
                        </span>
                      </div>
                      <button
                        onClick={() => manejarDesvincularAlumno(alumno.id)}
                        className="p-0 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Desvincular alumno"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* --- 2. ASIGNAR ALUMNOS --- */}
            <section className={cardContainer}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 text-blue-400">
                  <UserPlus size={22} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Inscribir alumnos
                </h2>
              </div>

              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar alumno sin curso..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none text-white"
                />
              </div>
              <div className={scrollArea}>
                {cupoCompleto ? (
                  <div className="h-full flex flex-col items-center justify-center text-red-400">
                    <Users size={80} className="mb-4 opacity-60" />
                    <p className="text-sm font-medium">Cupo Completo</p>
                  </div>
                ) : alumnosFiltrados.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Users size={80} className="mb-3 opacity-30" />
                    <p className="text-sm font-medium">
                      No hay alumnos disponibles
                    </p>
                  </div>
                ) : (
                  alumnosFiltrados.map((alumno) => (
                    <div
                      key={alumno.id}
                      className="flex items-center justify-between bg-slate-800/30 p-2.5 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-all"
                    >
                      <span className="text-slate-200 font-medium">
                        {alumno.nombre}
                      </span>
                      <button
                        onClick={() => manejarAsignarAlumno(alumno.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all"
                      >
                        Inscribir
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {/* TAB DOCENTES */}
        {tabActiva === "docentes" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* --- 3. DOCENTES ASIGNADOS --- */}
            <section className={cardContainer}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle size={22} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Docentes asignados
                </h2>
              </div>

              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar docente asignado..."
                  value={busquedaDocentesAsignados}
                  onChange={(e) => setBusquedaDocentesAsignados(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/40 outline-none text-white"
                />
              </div>

              <div className={scrollArea}>
                {docentesAsignadosFiltrados?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Users size={80} className="mb-3 opacity-30" />
                    <p className="text-sm font-medium">
                      Sin docentes asignados
                    </p>
                  </div>
                ) : (
                  docentesAsignadosFiltrados.map((docente) => (
                    <div
                      key={docente.id}
                      className="flex items-center justify-between bg-slate-800/30 p-2.5 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 group transition-all"
                    >
                      <span className="text-slate-200 font-medium">
                        {docente.nombre}
                      </span>

                      <button
                        onClick={() => manejarDesvincularDocente(docente.id)}
                        className="p-0 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* --- 4. DOCENTES DISPONIBLES --- */}
            <section className={cardContainer}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-purple-400 border border-blue-500/20 text-blue-400">
                  <Users size={22} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Docentes disponibles
                </h2>
              </div>

              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar docente disponible..."
                  value={busquedaDocente}
                  onChange={(e) => setBusquedaDocente(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500/40 outline-none text-white"
                />
              </div>

              <div className={scrollArea}>
                {docentesDisponiblesFiltrados.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Users size={30} className="mb-3 opacity-30" />
                    <p className="text-sm font-medium">
                      No hay docentes disponibles
                    </p>
                  </div>
                ) : (
                  docentesDisponiblesFiltrados.map((docente) => (
                    <div
                      key={docente.id}
                      className="flex items-center justify-between bg-slate-800/30 p-2 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-all"
                    >
                      <span className="text-slate-200 font-medium">
                        {docente.nombre}
                      </span>

                      <button
                        onClick={() => manejarAsignarDocente(docente.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all"
                      >
                        Asignar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {/* TAB FOROS */}
        {tabActiva === "foro" && (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <ForoCurso cursoId={curso.id} />
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </>
  );
}

export default AdminCursoDetalle;
