import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CursosService } from "../../utils/CursosService";
import { 
  User, 
  GraduationCap, 
  Search, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  UserPlus, 
  BookOpen,
  Trash2, // Ícono para desvincular
  X
} from "lucide-react"; 

function AdminCursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [alumnosSinCurso, setAlumnosSinCurso] = useState([]);
  const [docentesDisponibles, setDocentesDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDocente, setBusquedaDocente] = useState("");
  const cupoCompleto =
  curso?.alumnos && curso?.cupo
    ? curso.alumnos.length >= curso.cupo
    : false;

  const fetchData = async () => {
    try {
      const [cursoData, alumnosData, docentesData] = await Promise.all([
        CursosService.obtenerPorId(id),
        CursosService.getAlumnosSinCurso(),
        CursosService.getDocentes()
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

  const alumnosFiltrados = alumnosSinCurso.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const docentesFiltrados = docentesDisponibles
    .filter(d => !curso?.docentes?.some(cd => cd.id === d.id))
    .filter(d =>
      d.nombre.toLowerCase().includes(busquedaDocente.toLowerCase())
    );

  const cardContainer = "bg-slate-900/50 rounded-2xl border border-slate-800 p-6 shadow-2xl h-[520px] flex flex-col transition-all hover:border-slate-700/50";
  const scrollArea = "flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-slate-400 font-medium animate-pulse">Cargando gestión...</p>
      </div>
    </div>
  );

  if (!curso) return <div className="p-10 text-white text-center">Curso no encontrado</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-4 md:p-10">
      
      {/* --- HEADER --- */}
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
              <h1 className="text-4xl font-black text-white tracking-tight">{curso.nombre}</h1>
              <p className="text-slate-400 flex items-center gap-2 mt-1 italic italic">
                <BookOpen size={14} /> Gestión de integrantes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-slate-500">Ocupación</p>
                <p className="text-2xl font-mono font-bold text-white">
                  {curso.alumnos?.length} <span className="text-slate-600 text-sm">/ {curso.cupo}</span>
                </p>
             </div>
             <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                <Users size={24} />
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- 1. ALUMNOS INSCRITOS --- */}
        <section className={cardContainer}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 text-emerald-400">
              <CheckCircle size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Alumnos Inscritos</h2>
          </div>
          
          <div className={scrollArea}>
            {curso.alumnos?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-2xl">
                <p className="text-sm font-medium">Sin alumnos vinculados</p>
              </div>
            ) : (
              curso.alumnos?.map((alumno, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                      {alumno.nombre?.charAt(0) || "A"}
                    </div>
                    <span className="text-slate-200 font-medium">{alumno.nombre || alumno}</span>
                  </div>
                  <button 
                    onClick={() => manejarDesvincularAlumno(alumno.id)} 
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Desvincular Alumno"
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
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 text-blue-400">
              <UserPlus size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Inscribir Alumnos</h2>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none text-white"
            />
          </div>

          <div className={scrollArea}>
            {cupoCompleto ? (
              <div className="h-full flex flex-col items-center justify-center text-red-400">
                <Users size={40} className="mb-4 opacity-40" />
                <p className="text-lg font-bold uppercase tracking-widest">
                  Cupo Completo
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  No se pueden inscribir más alumnos
                </p>
              </div>
            ) : alumnosFiltrados.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Users size={30} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">
                  No hay alumnos disponibles
                </p>
              </div>
            ) : (
              alumnosFiltrados.map((alumno) => (
                <div key={alumno.id} className="flex items-center justify-between bg-slate-950/40 p-4 rounded-xl border border-slate-800 hover:border-blue-500/30 group transition-all">
                  <span className="text-slate-300 font-medium">{alumno.nombre}</span>
                  <button
                    onClick={() => manejarAsignarAlumno(alumno.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-black transition-all uppercase"
                  >
                    Vincular
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- 3. DOCENTES ASIGNADOS --- */}
        <section className={cardContainer}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 text-purple-400">
              <GraduationCap size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Docentes a Cargo</h2>
          </div>
          
          <div className={scrollArea}>
            {curso.docentes?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-2xl text-slate-500">
                <p className="text-sm font-medium">Pendiente de designación</p>
              </div>
            ) : (
              curso.docentes?.map((docente, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-slate-100 font-bold">{docente.nombre || docente}</p>
                      <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest tracking-widest">Titular</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => manejarDesvincularDocente(docente.id)} 
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
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
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-700/50 rounded-xl text-slate-400 border border-slate-700/50 text-slate-400">
              <Users size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Staff Docente</h2>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Buscar docente..."
              value={busquedaDocente}
              onChange={(e) => setBusquedaDocente(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500/40 outline-none text-white"
            />
          </div>

          <div className={scrollArea}>
            {docentesFiltrados.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Users size={30} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">
                  No hay docentes disponibles
                </p>
              </div>
            ) : (
              docentesFiltrados.map((docente) => (
                <div key={docente.id} className="flex items-center justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-200">{docente.nombre}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Activo</span>
                  </div>
                  <button
                    onClick={() => manejarAsignarDocente(docente.id)}
                    className="bg-white text-slate-900 hover:bg-blue-50 px-5 py-2.5 rounded-lg text-[10px] font-black transition-all active:scale-95 uppercase"
                  >
                    Asignar
                  </button>
                </div>
              ))
            )}
            </div>
        </section>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        main { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
}

export default AdminCursoDetalle;