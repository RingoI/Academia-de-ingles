import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocenteById, updateDocente } from "../Services/docenteService";

export default function EditarDocentePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    titulo: "",
    estado: true,
    cuit: "",
    nombre: "",
    email: "",
    direccion: "",
    fechanacimiento: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;

    getDocenteById(Number(id)).then((docente) => {
      setForm({
        username: docente.username,
        password: "",
        titulo: docente.titulo,
        estado: docente.estado,
        cuit: docente.cuit,
        nombre: docente.nombre,
        email: docente.email,
        direccion: docente.direccion,
        fechanacimiento: docente.fechanacimiento,
      });
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateDocente(Number(id), form);
      alert("Docente actualizado");
      navigate("/");
    } catch (err: any) {
      console.error("ERROR PUT 👉", err);
      alert("Error al actualizar docente");
    }
  };

  if (loading) return <p>Cargando docente...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Editar docente</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" value={form.username} onChange={handleChange} />

        <input
          name="password"
          type="password"
          placeholder="Nueva contraseña (opcional)"
          onChange={handleChange}
        />

        <input name="titulo" value={form.titulo} onChange={handleChange} />
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="cuit" value={form.cuit} onChange={handleChange} />

        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />

        <input
          name="fechanacimiento"
          type="date"
          value={form.fechanacimiento}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleChange}
          />
          Activo
        </label>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
