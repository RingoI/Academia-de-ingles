import { useNavigate } from "react-router-dom";
import type { Curso } from "../Types/curso";

export default function CursoCard({ curso }: { curso: Curso }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{curso.nombre}</h3>

      <p className="text-gray-600 mb-4">
        Niveles: <span className="font-medium">{curso.niveles.join(", ")}</span>
      </p>

      <button
        onClick={() => navigate(`/cursos/${curso.id}`)}
        className="text-indigo-600 font-semibold hover:underline"
      >
        Ver detalles →
      </button>
    </div>
  );
}
