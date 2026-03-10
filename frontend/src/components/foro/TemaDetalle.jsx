import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { ArrowLeft, Send, Trash2, Pencil } from "lucide-react";
import { authStore } from "../../store/auth.store";
import React from "react";

function TemaDetalle({ tema, volver }) {

  const [mensajes, setMensajes] = useState([]);
  const [contenido, setContenido] = useState("");
  const [enviando, setEnviando] = useState(false);
  const usuarioId = authStore((state) => state.idUsuario);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [tituloEditado, setTituloEditado] = useState(tema.titulo);

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      const res = await axiosInstance.get(`/foro/temas/${tema.id}/mensajes`);
      setMensajes(res.data.content);
    } catch (error) {
      console.error("Error cargando mensajes", error);
    }
  };

  const enviarMensaje = async () => {
    if (!contenido.trim() || enviando) return;
    setEnviando(true);

    try {
      await axiosInstance.post(`/foro/temas/${tema.id}/mensajes`, {
        contenido
      });

      setContenido("");
      cargarMensajes();

    } catch (error) {
      console.error("Error enviando mensaje", error);
    } finally {
      setEnviando(false);
    }
  };

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

    const reaccionar = async (mensajeId, tipo) => {
        try {

          await axiosInstance.post(
            `/foro/mensajes/${mensajeId}/reacciones/${tipo}`
          );

          cargarMensajes();

        } catch (error) {
          console.error("Error reaccionando", error);
        }
    };

    const borrarMensaje = async (mensajeId) => {

      const confirmar = window.confirm(
        "¿Seguro que querés borrar este mensaje?"
      );

      if (!confirmar) return;

      try {

        await axiosInstance.delete(`/foro/mensajes/${mensajeId}`);

        cargarMensajes();

      } catch (error) {
        console.error("Error borrando mensaje", error);
      }
    };

    const editarMensaje = async (mensajeId) => {

    try {

        await axiosInstance.put(`/foro/mensajes/${mensajeId}`, {
          contenido: textoEditado
        });

        setEditandoId(null);
        setTextoEditado("");
        cargarMensajes();

      } catch (error) {
        console.error("Error editando mensaje", error);
      }

    };

    const editarTitulo = async () => {
      try {

        await axiosInstance.put(`/foro/tema/${tema.id}`, {
          titulo: tituloEditado
        });

        setEditandoTitulo(false);
        cargarMensajes(); // o recargar tema si tenés endpoint

      } catch (error) {
        console.error("Error editando título", error);
      }
    };


  return (
    <div className="flex flex-col gap-6">

      {/* VOLVER */}
      <button
        onClick={volver}
        className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400"
      >
        <ArrowLeft size={18}/>
        Volver al foro
      </button>

      {/* TÍTULO */}
      <div>

          <div className="flex items-center gap-2">

            {editandoTitulo ? (

              <div className="flex gap-2 items-center">

                <input
                  value={tituloEditado}
                  onChange={(e) => setTituloEditado(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white"
                />

                <button
                  onClick={editarTitulo}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  guardar
                </button>

                <button
                  onClick={() => setEditandoTitulo(false)}
                  className="text-xs text-slate-400"
                >
                  cancelar
                </button>

              </div>

            ) : (

              <>
                <h2 className="text-xl text-white font-semibold">
                  {tema.titulo}
                </h2>

                <button
                  onClick={() => setEditandoTitulo(true)}
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <Pencil size={16}/>
                </button>
              </>

            )}

          </div>

          <p className="text-slate-500 text-sm">
            iniciado por {tema.autor}
          </p>

      </div>


      {/* MENSAJES */}
      <div className="flex flex-col gap-4">

        {mensajes.map((mensaje, index) => {

          const likes =
            mensaje.reacciones?.filter(r => r.tipo === "LIKE").length || 0;

          const loves =
            mensaje.reacciones?.filter(r => r.tipo === "LOVE").length || 0;

          const laughs =
            mensaje.reacciones?.filter(r => r.tipo === "LAUGH").length || 0;

          const dislikes =
            mensaje.reacciones?.filter(r => r.tipo === "DISLIKE").length || 0;

          const miReaccion = mensaje.reacciones?.find(
                r => r.persona?.id === usuarioId
          );
     
          const personasLike =
            mensaje.reacciones?.filter(r => r.tipo === "LIKE") || [];

          const personasLove =
            mensaje.reacciones?.filter(r => r.tipo === "LOVE") || [];

          const personasLaugh =
            mensaje.reacciones?.filter(r => r.tipo === "LAUGH") || [];

          const personasDislike =
            mensaje.reacciones?.filter(r => r.tipo === "DISLIKE") || [];

          return (

          <React.Fragment key={mensaje.id}>

            {index === 1 && (
              <div className="flex items-center gap-3 mt-6 mb-2">
                <div className="h-px bg-slate-700 flex-1"></div>

                <span className="text-xs text-slate-500">
                  RESPUESTAS
                </span>

                <div className="h-px bg-slate-700 flex-1"></div>
              </div>
            )}

            <div
              key={mensaje.id}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
            >

              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">

              <div className="flex items-center gap-2">

                <span className="text-slate-300 font-medium">
                  {mensaje.autor.nombre}
                </span>

                <span className="text-slate-600 text-xs">
                  {tiempoRelativo(mensaje.fecha)}
                  {mensaje.editado && " (editado)"}
                </span>

              </div>

             {mensaje.autor.id === usuarioId && (

                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      setEditandoId(mensaje.id);
                      setTextoEditado(mensaje.contenido);
                    }}
                    className="text-slate-400 hover:text-cyan-400"
                  >
                    <Pencil size={14}/>
                  </button>

                  <button
                    onClick={() => borrarMensaje(mensaje.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 size={14}/>
                  </button>

                </div>

              )}

            </div>

              {editandoId === mensaje.id ? (

                  <div className="flex gap-2 mt-2">

                    <input
                      value={textoEditado}
                      onChange={(e) => setTextoEditado(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white"
                    />

                    <button
                      onClick={() => editarMensaje(mensaje.id)}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      guardar
                    </button>

                    <button
                      onClick={() => setEditandoId(null)}
                      className="text-xs text-slate-400"
                    >
                      cancelar
                    </button>

                  </div>

                ) : (

                  <div className="text-slate-200">
                    {mensaje.contenido}
                  </div>

                )}

              {/* REACCIONES */}
              <div className="flex gap-2 mt-2 text-sm">

              <div className="relative group">

                  <button
                    onClick={() => reaccionar(mensaje.id, "LIKE")}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition ${
                      miReaccion?.tipo === "LIKE"
                        ? "bg-yellow-300/20 text-yellow-400"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    👍 {likes > 0 && likes}
                  </button>

                  {likes > 0 && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none bg-slate-800 text-xs text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">

                      {personasLike.map((r) => (
                        <div key={r.id}>
                          {r.persona?.id === usuarioId ? "Tú" : r.persona?.nombre}
                        </div>
                      ))}
                      <div className="absolute left-1/2 -top-1 w-2 h-2 bg-slate-800 rotate-45 -translate-x-1/2"></div>

                    </div>
                  )}

              </div>
              
              <div className="relative group">

                  <button
                    onClick={() => reaccionar(mensaje.id, "DISLIKE")}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition ${
                      miReaccion?.tipo === "DISLIKE"
                        ? "bg-yellow-300/20 text-yellow-400"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    👎 {dislikes > 0 && dislikes}
                  </button>

                  {dislikes > 0 && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none bg-slate-800 text-xs text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">

                      {personasDislike.map((r) => (
                        <div key={r.id}>
                          {r.persona?.id === usuarioId ? "Tú" : r.persona?.nombre}
                        </div>
                      ))}

                      <div className="absolute left-1/2 -top-1 w-2 h-2 bg-slate-800 rotate-45 -translate-x-1/2"></div>

                    </div>
                  )}

                </div>


              <div className="relative group">

                  <button
                    onClick={() => reaccionar(mensaje.id, "LOVE")}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition ${
                      miReaccion?.tipo === "LOVE"
                        ? "bg-yellow-300/20 text-yellow-400"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    ❤️ {loves > 0 && loves}
                  </button>

                  {loves > 0 && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none bg-slate-800 text-xs text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">

                      {personasLove.map((r) => (
                        <div key={r.id}>
                          {r.persona?.id === usuarioId ? "Tú" : r.persona?.nombre}
                        </div>
                      ))}
                      <div className="absolute left-1/2 -top-1 w-2 h-2 bg-slate-800 rotate-45 -translate-x-1/2"></div>

                    </div>
                  )}

              </div>

            
            <div className="relative group">

                <button
                  onClick={() => reaccionar(mensaje.id, "LAUGH")}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition ${
                    miReaccion?.tipo === "LAUGH"
                      ? "bg-yellow-300/20 text-yellow-400"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  😂 {laughs > 0 && laughs}
                </button>

                {laughs > 0 && (
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none bg-slate-800 text-xs text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">

                    {personasLaugh.map((r) => (
                      <div key={r.id}>
                        {r.persona?.id === usuarioId ? "Tú" : r.persona?.nombre}
                      </div>
                    ))}
                    <div className="absolute left-1/2 -top-1 w-2 h-2 bg-slate-800 rotate-45 -translate-x-1/2"></div>

                  </div>
                )}

            </div>





              </div>

            </div>

            </React.Fragment>

            );

        })}


      </div>

      {/* RESPUESTA */}
      {!tema.cerrado && (

          <div className="flex gap-3 mt-4">

            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe tu respuesta..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-3 text-white resize-none h-20"
            />

            <button
              disabled={enviando}
              onClick={enviarMensaje}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg"
            >
              <Send size={16}/>
              Enviar
            </button>

          </div>

        )}

    </div>
  );
}

export default TemaDetalle;