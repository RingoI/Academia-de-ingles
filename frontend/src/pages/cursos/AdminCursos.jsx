import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";

function AdminCursos() {

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axiosInstance.get("/cursos");
        console.log("Cursos:", res.data);
        setCursos(res.data);
      } catch (error) {
        console.log("Error al obtener cursos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando cursos...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-8 text-white">
        Administración de Cursos
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-[#0a2540]">
              {curso.nombre}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Niveles: {curso.niveles.join(", ")}
            </p>

            <p className="text-sm text-slate-500">
              Docentes: {curso.docentes.join(", ")}
            </p>

            <p className="text-sm text-slate-500">
              Alumnos: {curso.alumnos.length} / {curso.cupo}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              {curso.fechaInicio} → {curso.fechaFin}
            </p>

            <button
                onClick={() => navigate(`/cursos/${curso.id}`)}
                className="mt-6 w-full bg-[#0a2540] text-white py-2 rounded-lg hover:opacity-90 transition"
            >
            Gestionar curso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCursos;