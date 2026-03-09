import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { MessageCircle, Plus, Pin, Lock, Trash2 } from "lucide-react";
import FormularioTema from "./FormularioTema";
import TemaDetalle from "./TemaDetalle";
import { authStore } from "../../store/auth.store";

function ForoCurso({ cursoId }) {

  const [temas, setTemas] = useState([]);
  const [abrirFormulario, setAbrirFormulario] = useState(false);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const rol = authStore((state) => state.rol);

  useEffect(() => {
    cargarTemas();
  }, []);

  const cargarTemas = async () => {
    try {
      const res = await axiosInstance.get(`/foro/cursos/${cursoId}/temas`);
      setTemas(res.data);
    } catch (error) {
      console.error("Error cargando temas", error);
    }
  };

  const toggleFijarTema = async (id) => {
    try {
      await axiosInstance.patch(`/foro/tema/${id}/fijar`);
      cargarTemas();
    } catch (error) {
      console.error("Error fijando tema", error);
    }
  };

  const toggleCerrarTema = async (id) => {
    try {
      await axiosInstance.patch(`/foro/tema/${id}/cerrar`);
      cargarTemas();
    } catch (error) {
      console.error("Error cerrando tema", error);
    }
  };

  const eliminarTema = async (id) => {
    if (!confirm("¿Eliminar este tema?")) return;
    try {
      await axiosInstance.delete(`/foro/tema/${id}`);
      cargarTemas();
    } catch (error) {
      console.error("Error eliminando tema", error);
    }
  };

  if (!cursoId) return null;

  if (temaSeleccionado) {
    return (
      <TemaDetalle
        tema={temaSeleccionado}
        volver={() => {
          setTemaSeleccionado(null);
          cargarTemas();
        }}
      />
    );
  }

  function tiempoRelativo(fecha) {

    const ahora = new Date();
    const fechaMensaje = new Date(fecha);

    const diff = Math.floor((ahora - fechaMensaje) / 1000);

    if (diff < 60) return "hace unos segundos";

    const minutos = Math.floor(diff / 60);
    if (minutos < 60) return `hace ${minutos} min`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `hace ${horas} h`;

    const dias = Math.floor(horas / 24);
    return `hace ${dias} días`;
  }

  return (
    
    <div className="flex flex-col gap-6">

      {/* ESTADO VACÍO */}
      {temas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-slate-500">

          <MessageCircle size={64} className="text-slate-700 mb-4" />

          <p className="text-sm font-medium">
            Aún no hay temas en este curso
          </p>

          <button
            onClick={() => setAbrirFormulario(true)}
            className="mt-6 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-2 rounded-lg transition"
            >
            <Plus size={16} />
            Crear primer tema
          </button>

        </div>
      )}


      {/* LISTA DE TEMAS */}
      {temas.length > 0 && (

        <>
          <div className="flex justify-end">
            <button
              onClick={() => setAbrirFormulario(true)}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-2 rounded-lg transition"
              >
              <Plus size={16} />
              Nuevo tema
            </button>
          </div>

          {temas.map((tema) => (
            <div
              key={tema.id}
              onClick={() => setTemaSeleccionado(tema)}
              className={`rounded-xl p-4 transition cursor-pointer border
              ${tema.fijado
                ? "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-400/60"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700"}
              `}
            >

            <div className="flex justify-between items-start">

                <div className="flex flex-col">

                    <div className="flex items-center gap-2 text-slate-200 font-medium">

                        {tema.fijado && (
                            <span className="text-yellow-400">📌</span>
                        )}

                        {tema.titulo}

                        {tema.cerrado && (
                            <span className="flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                                <Lock size={12} />
                                Tema cerrado
                            </span>
                        )}

                    </div>

                    <div className="text-slate-500 text-sm">
                        iniciado por {tema.autor || "Admin"}
                    </div>

                </div>

               
                <div className="flex flex-col items-end gap-1">

                  <div className="flex items-center gap-3 text-slate-400 text-sm">

                    {/* respuestas */}
                    <div className="flex items-center gap-1 text-sm">
                      <MessageCircle size={16} />
                      <span>{tema.cantidadMensajes}</span>
                    </div>

                    {rol !== "ROLE_ALUMNO" && (
                      <>
                        {/* fijar */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFijarTema(tema.id);
                          }}
                          className={`transition ${
                            tema.fijado
                              ? "text-yellow-400"
                              : "text-slate-500 hover:text-yellow-400"
                          }`}
                          title={tema.fijado ? "Desfijar tema" : "Fijar tema"}
                        >
                          <Pin size={16} />
                        </button>

                        {/* cerrar */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCerrarTema(tema.id);
                          }}
                          className={`transition ${
                            tema.cerrado
                              ? "text-red-400"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                          title={tema.cerrado ? "Abrir tema" : "Cerrar tema"}
                        >
                          <Lock size={16} />
                        </button>

                        {/* eliminar */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            eliminarTema(tema.id);
                          }}
                          className="text-slate-500 hover:text-red-400 transition"
                          title="Eliminar tema"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}

                  </div>

                  {tema.ultimoAutor && tema.ultimoMensaje && (
                    <div className="text-slate-600 text-xs">
                      última actividad por {tema.ultimoAutor} • {tiempoRelativo(tema.ultimoMensaje)}
                    </div>
                  )}

                </div>

              

            </div>

            </div>
          ))}

        </>
      )}

      {abrirFormulario && (
        <FormularioTema
          cursoId={cursoId}
          cerrar={() => setAbrirFormulario(false)}
          recargar={cargarTemas}
        />
      )}

      

    </div>
  );
}

export default ForoCurso;