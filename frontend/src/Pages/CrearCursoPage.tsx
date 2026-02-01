import { useState } from "react";
import { createCurso } from "../Services/cursoService";
import { useNavigate } from "react-router-dom";

export default function CrearCursoPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [niveles, setNiveles] = useState<string[]>([]);
  const [cupo, setCupo] = useState<number>(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleNivel = (nivel: string) => {
    setNiveles((prev) =>
      prev.includes(nivel) ? prev.filter((n) => n !== nivel) : [...prev, nivel],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCurso({
        nombre,
        niveles,
        cupo,
        fechaInicio,
        fechaFin,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creando curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Crear curso</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Nombre del curso"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        {/* Niveles */}
        <div>
          <p className="font-medium mb-2">Niveles</p>
          <div className="flex gap-2 flex-wrap">
            {["A1", "A2", "B1", "B2", "C1"].map((niveles) => (
              <button
                type="button"
                key={niveles}
                onClick={() => toggleNivel(niveles)}
                className={`px-3 py-1 rounded border ${
                  niveles.includes(niveles)
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {niveles}
              </button>
            ))}
          </div>
        </div>

        {/* Cupo */}
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Cupo"
          value={cupo}
          onChange={(e) => setCupo(Number(e.target.value))}
          required
        />

        {/* Fechas */}
        <div className="flex gap-4">
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creando..." : "Crear curso"}
        </button>
      </form>
    </div>
  );
}
