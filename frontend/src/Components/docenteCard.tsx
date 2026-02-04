import { useNavigate } from "react-router-dom";
import type { Docente } from "../Types/docente";
import { deleteDocente } from "../Services/docenteService";
import { useAuth } from "../Context/AuthContext";

export default function DocenteCard({ docente }: { docente: Docente }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles.includes("ADMIN");

  const handleDelete = async () => {
    if (!confirm("¿Seguro que querés eliminar el docente?")) return;

    try {
      await deleteDocente(docente.id);
      alert("Docente eliminado");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error eliminando docente");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{docente.nombre}</h3>

      <p className="text-gray-600 mb-2">Email: {docente.email}</p>
      <p className="text-gray-600 mb-4">CUIT: {docente.cuit}</p>

      <button
        onClick={() => navigate(`/docentes/${docente.id}`)}
        className="text-indigo-600 font-semibold hover:underline"
      >
        Ver detalles →
      </button>

      {isAdmin && (
        <>
          <button
            onClick={() => navigate(`/docentes/${docente.id}/editar`)}
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
