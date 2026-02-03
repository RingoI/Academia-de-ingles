import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCursoById, updateCurso } from "../Services/cursoService";

const NIVELES_MAP: Record<string, number> = {
  A0: 0,
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
};

export default function EditarCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [niveles, setNiveles] = useState<string[]>([]);
  const [cupo, setCupo] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getCursoById(Number(id)).then((curso) => {
      setNombre(curso.nombre);
      setNiveles(curso.niveles);
      setCupo(curso.cupo);
      setFechaInicio(curso.fechaInicio);
      setFechaFin(curso.fechaFin);
      setLoading(false);
    });
  }, [id]);

  const toggleNivel = (nivel: string) => {
    setNiveles((prev) =>
      prev.includes(nivel) ? prev.filter((n) => n !== nivel) : [...prev, nivel],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCurso(Number(id), {
        nombre,
        nivelesIds: niveles.map((n) => NIVELES_MAP[n]),
        docentesIds: [], // se puede llenar después
        alumnosIds: [], // se puede llenar después
        cupo,
        fechaInicio,
        fechaFin,
      });

      alert("Curso actualizado");
      navigate("/");
    } catch (err: any) {
      console.error("ERROR PUT 👉", err);
      console.error("STATUS 👉", err?.response?.status);
      console.error("DATA 👉", err?.response?.data);
      alert("Error al actualizar");
    }
  };

  if (loading) return <p>Cargando curso...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Editar curso</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div>
          <p className="font-medium mb-2">Niveles</p>
          <div className="flex gap-2 flex-wrap">
            {["A0", "A1", "A2", "B1", "B2", "C1"].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => toggleNivel(n)}
                className={`px-3 py-1 rounded border ${
                  niveles.includes(n) ? "bg-indigo-600 text-white" : "bg-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={cupo}
          onChange={(e) => setCupo(Number(e.target.value))}
        />

        <div className="flex gap-4">
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
