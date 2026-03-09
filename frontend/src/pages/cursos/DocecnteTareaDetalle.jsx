import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { entregaStore } from "../../store/entrega.store";

function DocenteTareaDetalle() {
  const { cursoId, tareaId } = useParams();
  const { entregas, obtenerEntregasPorCurso } = entregaStore();

  useEffect(() => {
    obtenerEntregasPorCurso(cursoId);
  }, [cursoId]);

  // 🔥 FILTRADO CORRECTO
  const entregasFiltradas = entregas?.filter(
    (ent) => ent.tareaId === Number(tareaId),
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Entregas</h1>

      {entregasFiltradas?.length === 0 ? (
        <p>No hay entregas aún</p>
      ) : (
        entregasFiltradas.map((ent) => (
          <div
            key={ent.id}
            className="bg-slate-800 p-4 rounded-xl mb-4 flex justify-between"
          >
            <div>
              <p>Alumno: {ent.alumnoNombre}</p>
              <p>Fecha: {ent.fechaEntrega}</p>
              <p>Estado: {ent.estado}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={`http://localhost:8082/entregas/download/${ent.id}`}
                className="bg-emerald-600 px-3 py-1 rounded"
              >
                Descargar
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DocenteTareaDetalle;
