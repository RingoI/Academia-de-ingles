import { useEffect, useState } from "react";
import { tareaStore } from "../store/tarea.store";
import { entregaStore } from "../store/entrega.store";
import { Upload, FileText, ClipboardCheck } from "lucide-react";

function TablaEntregasAlumno({ cursoId, alumnoId }) {
  const { tareas, examenes, obtenerTareasPorCurso, obtenerExamenesPorCurso } =
    tareaStore();

  const { subirEntregaTarea, subirEntregaExamen, isUploading } = entregaStore();

  const [archivo, setArchivo] = useState(null);
  const [nombre, setNombre] = useState("");
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  useEffect(() => {
    obtenerTareasPorCurso(cursoId);
    obtenerExamenesPorCurso(cursoId);
  }, [cursoId]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemSeleccionado) {
      alert("Selecciona una tarea o examen");
      return;
    }

    let status;

    if (tipoSeleccionado === "TAREA") {
      status = await subirEntregaTarea(
        itemSeleccionado,
        alumnoId,
        archivo,
        nombre,
      );
    } else {
      status = await subirEntregaExamen(
        itemSeleccionado,
        alumnoId,
        archivo,
        nombre,
      );
    }

    if (status === 201) {
      alert("Entrega subida correctamente");
      setArchivo(null);
      setNombre("");
      setItemSeleccionado(null);
      setTipoSeleccionado("");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* TAREAS */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-cyan-400 mb-4">
          <ClipboardCheck size={18} />
          Tareas
        </h3>

        <div className="flex flex-col gap-3">
          {tareas.map((t) => (
            <label
              key={t.id}
              className={`flex justify-between items-center border rounded-xl p-4 cursor-pointer transition
              ${
                itemSeleccionado === t.id && tipoSeleccionado === "TAREA"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="entrega"
                  className="accent-cyan-500"
                  onChange={() => {
                    setItemSeleccionado(t.id);
                    setTipoSeleccionado("TAREA");
                  }}
                />

                <div>
                  <p className="font-semibold text-slate-200">{t.nombre}</p>
                  <p className="text-sm text-slate-400">
                    Fecha de entrega: {t.fechaEntrega}
                  </p>
                </div>
              </div>

              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg">
                TAREA
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* EXAMENES */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-400 mb-4">
          <FileText size={18} />
          Exámenes
        </h3>

        <div className="flex flex-col gap-3">
          {examenes.map((e) => (
            <label
              key={e.id}
              className={`flex justify-between items-center border rounded-xl p-4 cursor-pointer transition
              ${
                itemSeleccionado === e.id && tipoSeleccionado === "EXAMEN"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="entrega"
                  className="accent-orange-500"
                  onChange={() => {
                    setItemSeleccionado(e.id);
                    setTipoSeleccionado("EXAMEN");
                  }}
                />

                <div>
                  <p className="font-semibold text-slate-200">{e.nombre}</p>
                  <p className="text-sm text-slate-400">Fecha: {e.fecha}</p>
                </div>
              </div>

              <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg">
                EXAMEN
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* FORM SUBIR */}
      {itemSeleccionado && (
        <form
          onSubmit={handleSubmit}
          className="border border-slate-800 bg-slate-900/60 rounded-2xl p-6 flex flex-col gap-4"
        >
          <h4 className="flex items-center gap-2 font-semibold text-emerald-400">
            <Upload size={18} />
            Subir entrega
          </h4>

          <input
            type="text"
            placeholder="Nombre del archivo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files[0])}
            required
            className="text-sm"
          />

          <button
            type="submit"
            disabled={isUploading}
            className="bg-emerald-600 hover:bg-emerald-700 transition rounded-lg px-4 py-2 font-semibold"
          >
            {isUploading ? "Subiendo..." : "Enviar entrega"}
          </button>
        </form>
      )}
    </div>
  );
}

export default TablaEntregasAlumno;
