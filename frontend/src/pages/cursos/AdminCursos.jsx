import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CursosService } from "../../utils/CursosService"; 
import { 
  Plus, 
  Calendar, 
  Users, 
  GraduationCap, 
  X, 
  Layers, 
  ChevronRight,
  Info
} from "lucide-react";

function AdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Estado para el formulario (CreateCursoRequestDTO)
  const [formData, setFormData] = useState({
    nombre: "",
    cupo: 20,
    fechaInicio: "",
    fechaFin: "",
    docentesIds: [],
    nivelesIds: [],
    alumnosIds: []
  });

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const data = await CursosService.obtenerTodos();
      setCursos(data);
    } catch (error) {
      console.error("Error al obtener cursos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleCrearCurso = async (e) => {
    e.preventDefault();
    try {
      // Usamos el service que centraliza la lógica
      await CursosService.crear(formData);
      setShowModal(false);
      fetchCursos(); // Refrescamos la lista automáticamente
      // Reset del formulario
      setFormData({ 
        nombre: "", cupo: 20, fechaInicio: "", fechaFin: "", 
        docentesIds: [], nivelesIds: [], alumnosIds: [] 
      });
    } catch (error) {
      alert("Error al procesar la creación del curso.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-10">
      
      {/* HEADER DE SECCIÓN */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Administración de Cursos</h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2 font-medium">
            <Info size={16} className="text-blue-500" /> 
            Configuración de oferta académica y cupos
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/30 active:scale-95"
        >
          <Plus size={20} /> CREAR NUEVO CURSO
        </button>
      </header>

      {/* GRILLA DE TARJETAS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursos.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
            <Layers size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-slate-500 font-medium">No hay cursos registrados actualmente.</p>
          </div>
        ) : (
          cursos.map((curso) => (
            <div key={curso.id} className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 hover:border-blue-500/40 transition-all flex flex-col shadow-2xl group">
              <h2 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">
                {curso.nombre}
              </h2>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                    <Layers size={16} />
                  </div>
                  <span className="text-sm">Niveles: <b className="text-slate-200">{curso.niveles?.join(", ") || "N/A"}</b></span>
                </div>
                
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
                    <GraduationCap size={16} />
                  </div>
                  <span className="text-sm">Staff: <b className="text-slate-200">{curso.docentes?.join(", ") || "Sin asignar"}</b></span>
                </div>

                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Users size={16} />
                  </div>
                  <span className="text-sm">Cupos: <b className="text-slate-200">{curso.alumnos?.length} / {curso.cupo}</b></span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Vigencia</span>
                  <span className="text-xs text-slate-300 font-mono">{curso.fechaInicio} — {curso.fechaFin}</span>
                </div>
                <button
                  onClick={() => navigate(`/cursos/${curso.id}`)}
                  className="bg-slate-800 hover:bg-white hover:text-slate-900 p-3 rounded-xl transition-all shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: FORMULARIO DE CREACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black text-white">Nuevo Curso</h2>
                <p className="text-slate-500 text-sm">Completá los datos básicos del nivel.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleCrearCurso} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Descriptivo</label>
                <input 
                  required
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej: English Advanced C1 - 2026" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cupo de Alumnos</label>
                  <input 
                    type="number" 
                    value={formData.cupo}
                    onChange={(e) => setFormData({...formData, cupo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                  />
                </div>
                {/* Espacio para futuros campos como Costo o Tipo si lo requerís */}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Fecha de Inicio</label>
                  <input 
                    required
                    type="date" 
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Fecha de Finalización</label>
                  <input 
                    required
                    type="date" 
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({...formData, fechaFin: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/20 transition-all active:scale-[0.97] uppercase tracking-widest"
                >
                  Confirmar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ESTILOS DE SCROLLBAR */}
      <style jsx>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}

export default AdminCursos;