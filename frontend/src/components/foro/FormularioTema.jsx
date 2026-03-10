import { X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../../utils/axios";

function FormularioTema({ cursoId, cerrar, recargar }) {

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const crearTema = async () => {

    try {

      await axiosInstance.post(`/foro/cursos/${cursoId}/temas`, {
        titulo,
        contenido
      });

      cerrar();      // cerrar modal primero
      recargar();    // después recargar temas

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-800 rounded-xl w-[600px]">

        {/* HEADER */}

        <div className="flex justify-between items-center p-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="bg-cyan-600/20 p-2 rounded-lg">
              <MessageCircle size={20}/>
            </div>

            <div>
              <h2 className="text-white font-semibold">
                Nuevo tema
              </h2>

              <p className="text-slate-400 text-sm">
                Inicia una nueva discusión
              </p>
            </div>

          </div>

          <button onClick={cerrar}>
            <X className="text-slate-400"/>
          </button>

        </div>

        {/* FORM */}

        <div className="p-6 flex flex-col gap-4">

          <input
            placeholder="Título del tema"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
          />

          <textarea
            placeholder="Escribe el mensaje inicial..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white h-32"
          />

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-4 p-6 border-t border-slate-800">

          <button
            onClick={cerrar}
            className="text-slate-400"
          >
            Cancelar
          </button>

          <button
            onClick={crearTema}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg"
          >
            Publicar tema
          </button>

        </div>

      </div>

    </div>
  );
}

export default FormularioTema;