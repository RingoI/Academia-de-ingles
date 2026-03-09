import { useState, useEffect } from "react";
import { authStore } from "../store/auth.store";
import { Save, History, Calendar, Search, UserCheck } from "lucide-react";
import { axiosInstance } from "../utils/axios";

function AsistenciaCurso({ cursoId }) {
  const [nombreCurso, setNombreCurso] = useState("Cargando...");
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [itemAbierto, setItemAbierto] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const tokenDelStore =
          authStore.getState().token || localStorage.getItem("token");

        const config = {
          headers: { Authorization: `Bearer ${tokenDelStore}` },
        };
        // 1. Cargamos los alumnos
        const resAlumnos = await axiosInstance.get(
          `/cursos/${cursoId}/alumnos`,
        );

        const listaAlumnos = resAlumnos.data.data || [];
        setAlumnos(listaAlumnos.map((a) => ({ ...a, presente: true })));

        // 2. Extraemos el nombre del curso dinámicamente
        if (listaAlumnos.length > 0 && listaAlumnos[0].curso) {
          setNombreCurso(listaAlumnos[0].curso.nombre);
        } else {
          setNombreCurso(`Curso ID: ${cursoId}`);
        }

        // 3. Cargamos el historial
        try {
          const resHistorial = await axiosInstance.get(
            `/asistencias/curso/${cursoId}`,
          );
          const datosHistorial = resHistorial.data.data || [];
          setHistorial(agruparHistorial(datosHistorial));
        } catch (histError) {
          setHistorial([]);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          alert("Error 403: No tienes permisos o el token expiró.");
        }
      } finally {
        setCargando(false);
      }
    };

    if (cursoId) cargarDatos();
  }, [cursoId]);

  const agruparHistorial = (data) => {
    const agrupado = {};
    data.forEach((a) => {
      if (!agrupado[a.fecha]) {
        agrupado[a.fecha] = {
          fecha: a.fecha,
          presentes: 0,
          ausentes: 0,
          detalles: [],
        };
      }
      if (a.presente) agrupado[a.fecha].presentes++;
      else agrupado[a.fecha].ausentes++;

      agrupado[a.fecha].detalles.push({
        nombre: a.alumnoNombre || "Sin Nombre",
        estado: a.presente ? "P" : "A",
      });
    });
    return Object.values(agrupado);
  };

  const alumnosFiltrados = alumnos.filter((al) =>
    al.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const totalPresentes = alumnos.filter((a) => a.presente).length;
  const totalAusentes = alumnos.length - totalPresentes;

  const toggleAsistencia = (id) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, presente: !a.presente } : a)),
    );
  };

  const marcarTodosPresentes = () => {
    setAlumnos((prev) => prev.map((a) => ({ ...a, presente: true })));
  };

  const cargarHistorial = async () => {
    try {
      const tokenDelStore = authStore.getState().token;
      const resHistorial = await axiosInstance.get(
        `/asistencias/curso/${cursoId}`,
      );
      const datosHistorial = resHistorial.data.data || [];
      setHistorial(agruparHistorial(datosHistorial));
    } catch (err) {
      // Error silencioso para el usuario
    }
  };

  const guardarAsistencia = async () => {
    setCargando(true);
    try {
      const tokenDelStore = authStore.getState().token;
      const dataParaEnviar = {
        cursoId: parseInt(cursoId),
        fecha: new Date().toISOString().split("T")[0],
        alumnos: alumnos.map((al) => ({
          alumnoId: al.id,
          presente: al.presente,
        })),
      };

      const res = await axiosInstance.post("/asistencias/lote", dataParaEnviar);

      if (res.status === 200 || res.status === 201) {
        alert("¡Asistencia guardada correctamente!");
        await cargarHistorial();
      }
    } catch (error) {
      alert("Hubo un error al guardar.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="text-white">
      {" "}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[2]">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="font-semibold text-3xl">Pase de Lista</h1>
              <p className="text-slate-400">
                {nombreCurso} • {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <span className="text-green-400 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
                Presentes: {totalPresentes}
              </span>
              <span className="text-red-400 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                Ausentes: {totalAusentes}
              </span>
            </div>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-72">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar alumno..."
                  className="w-full bg-[#0c1224] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#06b6d4] transition-colors"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={marcarTodosPresentes}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  <UserCheck size={18} /> Todos
                </button>
                <button
                  onClick={guardarAsistencia}
                  disabled={cargando}
                  className="flex-1 md:flex-none bg-[#06b6d4] shadow-md hover:shadow-cyan-500/50 px-6 py-2 rounded-lg font-bold text-[#0c1224] flex gap-2 items-center justify-center transition-all disabled:opacity-50"
                >
                  <Save size={18} /> {cargando ? "Enviando..." : "Guardar"}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-left">
                <thead className="bg-[#0c1224] text-slate-400 text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Alumno</th>
                    <th className="py-3 px-4 text-center">Asistencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {alumnosFiltrados.map((al) => (
                    <tr
                      key={al.id}
                      className="hover:bg-slate-800/20 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-slate-200">
                        {al.nombre}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleAsistencia(al.id)}
                          className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest transition-all ${
                            al.presente
                              ? "bg-green-500/20 text-green-400 border border-green-500/40"
                              : "bg-red-500/20 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {al.presente ? "PRESENTE" : "AUSENTE"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-2 items-center mb-6">
            <History className="text-[#818cf8] bg-[#0c1224] size-9 p-1.5 rounded-xl" />
            <h2 className="font-semibold text-xl">Historial Reciente</h2>
          </div>
          <div className="flex flex-col gap-3">
            {historial.map((h, i) => (
              <div
                key={i}
                onClick={() => setItemAbierto(itemAbierto === i ? null : i)}
                className="bg-[#111827] p-4 rounded-xl border border-slate-800 hover:border-[#818cf8]/50 transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#818cf8]" />
                    <span className="text-sm font-medium text-slate-200">
                      {h.fecha}
                    </span>
                  </div>
                  <div className="flex gap-2 text-[10px] font-bold">
                    <span className="text-green-400">P: {h.presentes}</span>
                    <span className="text-red-400">A: {h.ausentes}</span>
                  </div>
                </div>

                {itemAbierto === i && (
                  <div className="mt-3 pt-3 border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-1.5">
                      {h.detalles.map((det, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-[10px] bg-[#0c1224] p-1.5 rounded px-3 border border-slate-800/50"
                        >
                          <span className="text-slate-400 truncate mr-2">
                            {det.nombre}
                          </span>
                          <span
                            className={`font-black ${det.estado === "P" ? "text-green-500" : "text-red-500"}`}
                          >
                            {det.estado}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsistenciaCurso;
