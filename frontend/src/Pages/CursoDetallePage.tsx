import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCursoById } from "../Services/cursoService";
import type { Curso } from "../Types/curso";

export default function CursoDetallePage() {
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);

  useEffect(() => {
    if (id) {
      getCursoById(Number(id)).then(setCurso);
    }
  }, [id]);

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">{curso.nombre}</h2>
      <p className="text-gray-600 mb-4">Niveles: {curso.niveles.join(", ")}</p>

      {curso.cupo && <p className="text-gray-700">Cupo: {curso.cupo}</p>}

      {curso.fechaInicio && (
        <p className="text-gray-700 mt-4">
          Fecha de inicio: {curso.fechaInicio}
        </p>
      )}
      {curso.fechaFin && (
        <p className="text-gray-700 mt-4">Fecha de fin: {curso.fechaFin}</p>
      )}
    </div>
  );
}
