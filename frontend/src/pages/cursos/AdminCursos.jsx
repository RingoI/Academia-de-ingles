import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CursosService } from "../../utils/CursosService";
import { Trash2 } from "lucide-react";
import {
  Plus,
  Calendar,
  Users,
  GraduationCap,
  X,
  Layers,
  ChevronRight,
  Info,
  BookOpen,
  ArrowRight,
} from "lucide-react";

function AdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [niveles, setNiveles] = useState([]);

  // Estado para el formulario (CreateCursoRequestDTO)
  const [formData, setFormData] = useState({
    nombre: "",
    cupo: 20,
    fechaInicio: "",
    fechaFin: "",
    docentesIds: [],
    nivelesIds: [],
    alumnosIds: [],
  });

  const formatearFecha = (fechaISO) => {
    const [anio, mes, dia] = fechaISO.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const coloresTexto = [
    "text-blue-300",
    "text-purple-300",
    "text-cyan-300",
    "text-indigo-300",
    "text-amber-300",
    "text-emerald-300",
    "text-pink-300",
  ];

  const coloresAura = [
    "bg-blue-500/25",
    "bg-purple-500/25",
    "bg-cyan-500/25",
    "bg-indigo-500/25",
    "bg-amber-500/25",
    "bg-emerald-500/25",
    "bg-pink-500/25",
  ];

  const getColorIndex = (nombre) => {
    const letra = nombre.charAt(0).toUpperCase();
    return letra.charCodeAt(0) % coloresTexto.length;
  };

  const getNivelColor = (nombre) => {
    return coloresTexto[getColorIndex(nombre)];
  };

  const getNivelAura = (nombre) => {
    return coloresAura[getColorIndex(nombre)];
  };

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

    const fetchNiveles = async () => {
      try {
        const response = await fetch("http://localhost:8082/niveles");
        const data = await response.json();

        const ordenados = data.sort((a, b) => a.id - b.id);

        setNiveles(ordenados);
      } catch (error) {
        console.error("Error al obtener niveles", error);
      }
    };

    fetchNiveles();
  }, []);

  const handleCrearCurso = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando curso:", formData);
      await CursosService.crear(formData);
      setShowModal(false);
      fetchCursos(); // Refrescamos la lista automáticamente
      // Reset del formulario
      setFormData({
        nombre: "",
        cupo: 20,
        fechaInicio: "",
        fechaFin: "",
        docentesIds: [],
        nivelesIds: [],
        alumnosIds: [],
      });
    } catch (error) {
      alert("Error al procesar la creación del curso.");
    }
  };

  const manejarEliminarCurso = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este curso?")) return;
    try {
      await CursosService.eliminar(id);
      fetchCursos();
    } catch (error) {
      alert("No se pudo eliminar el curso.");
    }
  };

  const manejarActualizarCurso = async (curso) => {
    try {
      const dto = {
        nombre: curso.nombre,
        fechaInicio: curso.fechaInicio,
        fechaFin: curso.fechaFin,
        cupo: curso.cupo,
        docentesIds: curso.docentesIds,
        nivelesIds: curso.nivelesIds,
        alumnosIds: curso.alumnosIds,
      };

      await CursosService.actualizar(curso.id, dto);
      fetchCursos();
      alert("Curso actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el curso");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="h-full w-full relative">
      {/* HEADER DE SECCIÓN */}
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="mb-1">
          <h1 className="font-semibold text-3xl text-slate-400">
            Administración de cursos
          </h1>
          <p className="text-slate-400">
            Configuración de oferta académica y cupos
          </p>
        </div>
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-indigo-500/50 px-4 py-2 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer flex items-center gap-2"
          >
            <Plus size={16} />
            Crear curso
          </button>
        </div>
      </header>

      <div className="border-b border-slate-400 mt-6 mb-10"></div>

      {/* GRILLA DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursos.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
            <Layers size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-slate-500 font-medium">
              No hay cursos registrados actualmente.
            </p>
          </div>
        ) : (
          cursos.map((curso) => (
            <div
              key={curso.id}
              className="relative overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#0c1625] to-[#0a1422] rounded-3xl border border-slate-800 p-8 hover:border-blue-500/40 transition-all flex flex-col shadow-2xl group"
            >
              {/* FONDO DECORATIVO GIGANTE */}
              <div className="absolute -right-10 -top-10 text-slate-500/5 rotate-12 group-hover:text-blue-500/10 transition-colors">
                <BookOpen size={160} />
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors pr-10">
                    {curso.nombre}
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* BOTÓN ELIMINAR */}
                    <Trash2
                      size={20}
                      onClick={() => manejarEliminarCurso(curso.id)}
                      className="cursor-pointer text-slate-500 hover:text-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                      <Layers size={16} />
                    </div>
                    <span className="text-sm">
                      Niveles:{" "}
                      <b className="text-slate-200">
                        {curso.niveles?.length
                          ? curso.niveles.join(", ")
                          : "N/A"}
                      </b>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
                      <GraduationCap size={16} />
                    </div>
                    <span className="text-sm">
                      Staff:{" "}
                      <b className="text-slate-200">
                        {curso.docentes && curso.docentes.length > 0
                          ? curso.docentes.map((d) => d.nombre).join(", ")
                          : "Sin asignar"}
                      </b>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                      <Users size={16} />
                    </div>
                    <span className="text-sm">
                      Cupos:{" "}
                      <b className="text-slate-200">
                        {curso.alumnos?.length || 0} / {curso.cupo}
                      </b>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Vigencia
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      {formatearFecha(curso.fechaInicio)} —{" "}
                      {formatearFecha(curso.fechaFin)}
                    </span>
                  </div>
                </div>

                {/* BOTÓN VER DETALLE / GESTIONAR */}
                <button
                  onClick={() => navigate(`/cursos/${curso.id}`)}
                  className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg"
                >
                  Gestionar integrantes
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
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
                <h2 className="text-3xl font-black text-white">Nuevo curso</h2>
                <p className="text-slate-500 text-sm">
                  Completá los datos básicos del nivel.
                </p>
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
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nombre descriptivo
                </label>
                <input
                  required
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Ej: English Advanced C1 - 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Cupo de alumnos
                  </label>
                  <input
                    type="number"
                    value={formData.cupo}
                    onChange={(e) =>
                      setFormData({ ...formData, cupo: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Niveles
                  </label>

                  <select
                    multiple
                    value={formData.nivelesIds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nivelesIds: Array.from(
                          e.target.selectedOptions,
                          (option) => Number(option.value),
                        ),
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                  >
                    {niveles.map((nivel) => (
                      <option key={nivel.id} value={nivel.id}>
                        {nivel.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Fecha de inicio
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaInicio: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Fecha de finalización
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaFin: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/20 transition-all active:scale-[0.97] uppercase tracking-widest"
                >
                  Crear curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCursos;
