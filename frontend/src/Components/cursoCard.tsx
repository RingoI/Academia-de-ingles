import { useNavigate } from "react-router-dom";
import type { Curso } from "../Types/curso";
import { deleteCurso } from "../Services/cursoService";

export default function CursoCard({ curso }: { curso: Curso }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!confirm("¿Seguro que querés eliminar el curso?")) return;

    try {
      await deleteCurso(curso.id);
      alert("Curso eliminado");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error eliminando curso");
    }
  };

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

      <button
        onClick={() => navigate(`/cursos/${curso.id}/editar`)}
        className="text-indigo-600 font-semibold hover:underline"
      >
        Editar →
      </button>

      <button
        onClick={handleDelete}
        className="text-indigo-600 font-semibold hover:underline"
      >
        Eliminar
      </button>
    </div>
  );
}
