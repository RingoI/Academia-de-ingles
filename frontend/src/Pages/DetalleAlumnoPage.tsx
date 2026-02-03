import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlumnoById } from "../Services/alumnoService";
import type { Alumno } from "../Types/alumno";
import { useNavigate } from "react-router-dom";

export default function AlumnoDetallePage() {
  const { id } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getAlumnoById(Number(id)).then(setAlumno);
  }, [id]);

  if (!alumno) return <p>Cargando alumno...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      <button
        onClick={() => navigate("/alumnos")}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Volver a alumnos
      </button>

      <h2 className="text-2xl font-bold">{alumno.nombre}</h2>
      <p>Email: {alumno.email}</p>
      <p>DNI: {alumno.dni}</p>
      <p>Dirección: {alumno.direccion}</p>
    </div>
  );
}
