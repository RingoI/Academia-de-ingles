import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlumnoCard from "../Components/alumnoCard";
import { useAuth } from "../Context/AuthContext";
import type { Alumno } from "../Types/alumno";
import { getAlumnos } from "../Services/alumnoService";

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdminOrDocente =
    user?.roles.includes("ADMIN") || user?.roles.includes("DOCENTE");

  useEffect(() => {
    getAlumnos()
      .then((data) => {
        console.log("ALUMNOS 👉", data);
        setAlumnos(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando alumnos...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Alumnos</h2>

      {isAdminOrDocente && (
        <button
          onClick={() => navigate("/alumnos/nuevo")}
          className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Crear alumno
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumnos.map((alumno) => (
          <AlumnoCard key={alumno.id} alumno={alumno} />
        ))}
      </div>
    </div>
  );
}
