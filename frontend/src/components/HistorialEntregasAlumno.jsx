import { useEffect, useState } from "react";
import { entregaStore } from "../store/entrega.store";

function HistorialEntregasAlumno({ alumnoId }) {
  const { historial, obtenerHistorialAlumno, reentregar } = entregaStore();
  const [archivos, setArchivos] = useState({});

  const handleReentrega = async (entregaId, file) => {
    if (!file) {
      alert("Selecciona un archivo");
      return;
    }

    const status = await reentregar(entregaId, file, file.name);

    if (status === 200) {
      alert("Reentrega enviada");
      obtenerHistorialAlumno(alumnoId);
    }
  };

  useEffect(() => {
    console.log("Obteniendo historial para alumnoId:", alumnoId);
    obtenerHistorialAlumno(alumnoId);
  }, [alumnoId]);

  return (
    <div className="flex flex-col gap-4">
      {historial.length === 0 && (
        <p className="text-slate-400">No hay entregas aún</p>
      )}

      {historial.map((ent) => {
        // Definir estado tipo Classroom
        let estadoTexto = "Entregado";
        let estadoClase = "bg-blue-600/30 text-blue-300"; // default azul

        if (ent.nota !== null) {
          if (ent.nota < 4) {
            estadoTexto = "Desaprobado";
            estadoClase = "bg-red-600/30 text-red-300";
          } else {
            estadoTexto = "Aprobado";
            estadoClase = "bg-green-600/30 text-green-300";
          }
        } else if (!ent.nota && !ent.comentario) {
          estadoTexto = "Pendiente de corrección";
          estadoClase = "bg-yellow-500/30 text-yellow-300";
        }

        // Color según tipo (TAREA / EXAMEN)
        const tipoClase =
          ent.tipo === "TAREA"
            ? "bg-cyan-600/30 text-cyan-300"
            : ent.tipo === "EXAMEN"
              ? "bg-orange-600/30 text-orange-300"
              : "bg-gray-600/30 text-gray-300";

        return (
          <div
            key={ent.id}
            className="bg-slate-800/90 hover:bg-slate-700 transition p-5 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            {/* Info principal */}
            <div className="flex flex-col gap-2 md:w-3/4">
              <p className="text-white font-bold text-lg">
                {ent.nombreActividad}
              </p>
              <p className="text-slate-300 text-sm truncate">
                📄 {ent.archivoNombre}
              </p>
              <p className="text-slate-400 text-sm">📅 {ent.fechaEntrega}</p>

              {/* Tipo de actividad */}
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${tipoClase}`}
              >
                {ent.tipo}
              </span>

              {/* Estado Classroom */}
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mt-1 ${estadoClase}`}
              >
                {estadoTexto}
              </span>
            </div>

            {/* Notas y comentario */}
            <div className="flex flex-col items-end gap-2 md:w-1/4">
              <span className="text-xl font-bold text-green-400">
                {ent.nota !== null ? `Nota: ${ent.nota}` : "Sin nota"}
                {ent.nota !== null && ent.nota < 4 && (
                  <div className="flex flex-col items-end gap-2 mt-2">
                    <input
                      type="file"
                      onChange={(e) =>
                        setArchivos({
                          ...archivos,
                          [ent.id]: e.target.files[0],
                        })
                      }
                      className="text-sm text-slate-300"
                    />

                    <button
                      onClick={() => handleReentrega(ent.id, archivos[ent.id])}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm font-semibold"
                    >
                      Reentregar
                    </button>
                  </div>
                )}
              </span>
              <p className="text-slate-400 text-sm italic">
                {ent.comentario ?? "Sin comentario"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HistorialEntregasAlumno;
