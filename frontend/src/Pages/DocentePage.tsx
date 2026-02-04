import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocenteCard from "../Components/docenteCard";
import { useAuth } from "../Context/AuthContext";
import type { Docente } from "../Types/docente";
import { getDocentes } from "../Services/docenteService";

export default function DocentePage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles.includes("ADMIN");

  useEffect(() => {
    getDocentes()
      .then((data) => {
        setDocentes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando docentes...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Docentes</h2>

      {isAdmin && (
        <button
          onClick={() => navigate("/docentes/nuevo")}
          className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Crear docente
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docentes.map((docente) => (
          <DocenteCard key={docente.id} docente={docente} />
        ))}
      </div>
    </div>
  );
}
