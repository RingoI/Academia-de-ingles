import { useEffect, useState } from "react";
import { tareaStore } from "../store/tarea.store";
import { entregaStore } from "../store/entrega.store";

function TablaEntregasAlumno({ cursoId, alumnoId }) {
  const {
    tareas,
    examenes,
    obtenerTareasPorCurso,
    obtenerExamenesPorCurso,
    isLoading,
  } = tareaStore();
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

    if (!itemSeleccionado) return alert("Selecciona una tarea o examen");

    let status;
    try {
      if (tipoSeleccionado === "TAREA") {
        status = await subirEntregaTarea(
          itemSeleccionado,
          alumnoId,
          archivo,
          nombre,
        );
      } else if (tipoSeleccionado === "EXAMEN") {
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
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al subir la entrega");
    }
  }

  if (isLoading) return <p>Cargando tareas y exámenes...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Subir Entrega</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Tareas</h3>
        {tareas.length === 0 && <p>No hay tareas disponibles</p>}
        {tareas.map((t) => (
          <div key={t.id} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="entrega"
              checked={
                itemSeleccionado === t.id && tipoSeleccionado === "TAREA"
              }
              onChange={() => {
                setItemSeleccionado(t.id);
                setTipoSeleccionado("TAREA");
              }}
            />
            <label>
              {t.nombre} (Entrega: {t.fechaEntrega})
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Exámenes</h3>
        {examenes.length === 0 && <p>No hay exámenes disponibles</p>}
        {examenes.map((e) => (
          <div key={e.id} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="entrega"
              checked={
                itemSeleccionado === e.id && tipoSeleccionado === "EXAMEN"
              }
              onChange={() => {
                setItemSeleccionado(e.id);
                setTipoSeleccionado("EXAMEN");
              }}
            />
            <label>
              {e.nombre} (Fecha: {e.fecha})
            </label>
          </div>
        ))}
      </div>

      {itemSeleccionado && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="Nombre del archivo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input mb-2 p-2 border rounded"
            required
          />
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files[0])}
            className="mb-2"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Enviar"}
          </button>
        </form>
      )}
    </div>
  );
}

export default TablaEntregasAlumno;
