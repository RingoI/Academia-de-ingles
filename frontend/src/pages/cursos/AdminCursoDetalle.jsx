import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

function AdminCursoDetalle() {
  const { id } = useParams();

  const [curso, setCurso] = useState(null);
  const [alumnosSinCurso, setAlumnosSinCurso] = useState([]);
  const [docentesDisponibles, setDocentesDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursoRes = await axiosInstance.get(`/cursos/${id}`);
        setCurso(cursoRes.data);

        const alumnosRes = await axiosInstance.get("/alumnos/sin-curso");
        setAlumnosSinCurso(alumnosRes.data);

        const docentesRes = await axiosInstance.get("/docentes");
        setDocentesDisponibles(docentesRes.data);

      } catch (error) {
        console.log("Error cargando datos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-white">Cargando...</div>;
  }

  if (!curso) {
    return <div className="p-10 text-white">Curso no encontrado</div>;
  }

  return (
    <div className="p-10 text-white space-y-10">
      
      <h1 className="text-2xl font-bold">
        Gestionando: {curso.nombre}
      </h1>

      <div className="grid grid-cols-2 gap-10">

        {/* Alumnos del curso */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Alumnos del curso
          </h2>

          {curso.alumnos?.length === 0 && (
            <p className="text-slate-400">No hay alumnos asignados</p>
          )}

          {curso.alumnos?.map((nombre, index) => (
            <div
              key={index}
              className="bg-slate-800 p-2 rounded mb-2"
            >
              {nombre}
            </div>
          ))}
        </div>

        {/* Alumnos sin curso */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Alumnos sin curso
          </h2>

          {alumnosSinCurso.length === 0 && (
            <p className="text-slate-400">Todos los alumnos tienen curso</p>
          )}

          {alumnosSinCurso.map((alumno) => (
            <div
              key={alumno.id}
              className="bg-slate-800 p-2 rounded mb-2 flex justify-between items-center"
            >
              <span>{alumno.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">

        {/* Docentes del curso */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Docentes del curso
          </h2>

          {curso.docentes?.length === 0 && (
            <p className="text-slate-400">No hay docentes asignados</p>
          )}

          {curso.docentes?.map((nombre, index) => (
            <div
              key={index}
              className="bg-slate-800 p-2 rounded mb-2"
            >
              {nombre}
            </div>
          ))}
        </div>

        {/* Docentes disponibles */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Docentes disponibles
          </h2>

          {docentesDisponibles.length === 0 && (
            <p className="text-slate-400">No hay docentes disponibles</p>
          )}

          {docentesDisponibles.map((docente) => (
            <div
              key={docente.id}
              className="bg-slate-800 p-2 rounded mb-2 flex justify-between items-center"
            >
              <span>{docente.nombre}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminCursoDetalle;