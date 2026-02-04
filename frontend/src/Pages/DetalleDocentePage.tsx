import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocenteById } from "../Services/docenteService";
import type { Docente } from "../Types/docente";

export default function DocenteDetallePage() {
  const { id } = useParams();
  const [docente, setDocente] = useState<Docente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getDocenteById(Number(id)).then(setDocente);
  }, [id]);

  if (!docente) return <p>Cargando docente...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      <button
        onClick={() => navigate("/docentes")}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Volver a docentes
      </button>

      <h2 className="text-2xl font-bold">{docente.nombre}</h2>
      <p>Email: {docente.email}</p>
      <p>CUIT: {docente.cuit}</p>
      <p>Título: {docente.titulo}</p>
      <p>Dirección: {docente.direccion}</p>
      <p>Estado: {docente.estado ? "Activo" : "Inactivo"}</p>
    </div>
  );
}
