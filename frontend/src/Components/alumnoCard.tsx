import { useNavigate } from "react-router-dom";
import type { Alumno } from "../Types/alumno";
import { deleteAlumno } from "../Services/alumnoService";
import { useAuth } from "../Context/AuthContext";

export default function AlumnoCard({ alumno }: { alumno: Alumno }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdminOrDocente =
    user?.roles.includes("ADMIN") || user?.roles.includes("DOCENTE");

  const handleDelete = async () => {
    if (!confirm("¿Seguro que querés eliminar el alumno?")) return;

    try {
      await deleteAlumno(alumno.id);
      alert("Alumno eliminado");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error eliminando alumno");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{alumno.nombre}</h3>

      <p className="text-gray-600 mb-2">Email: {alumno.email}</p>
      <p className="text-gray-600 mb-4">DNI: {alumno.dni}</p>

      <button
        onClick={() => navigate(`/alumnos/${alumno.id}`)}
        className="text-indigo-600 font-semibold hover:underline"
      >
        Ver detalles →
      </button>

      {isAdminOrDocente && (
        <>
          <button
            onClick={() => navigate(`/alumnos/${alumno.id}/editar`)}
            className="ml-4 text-indigo-600 font-semibold hover:underline"
          >
            Editar →
          </button>

          <button
            onClick={handleDelete}
            className="ml-4 text-red-600 font-semibold hover:underline"
          >
            Eliminar
          </button>
        </>
      )}
    </div>
  );
}
