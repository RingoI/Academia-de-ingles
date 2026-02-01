import { useEffect, useState } from "react";
import { getCursos } from "../Services/cursoService";
import type { Curso } from "../Types/curso";
import CursoCard from "../Components/cursoCard";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [nivel, setNivel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCursos()
      .then(setCursos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Cursos</h2>
      {(user?.role === "ADMIN" || user?.role === "DOCENTE") && (
        <button className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Crear curso
        </button>
      )}
      {(user?.role === "ADMIN" || user?.role === "DOCENTE") && (
        <button
          onClick={() => navigate("/cursos/nuevo")}
          className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Crear curso
        </button>
      )}

      <select
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        className="mb-6 border p-2 rounded-lg"
      >
        <option value="">Todos los niveles</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos
          .filter((curso) => !nivel || curso.niveles.includes(nivel))
          .map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
      </div>
    </div>
  );
}
