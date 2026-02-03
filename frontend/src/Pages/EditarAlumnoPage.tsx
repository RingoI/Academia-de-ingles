import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlumnoById, updateAlumno } from "../Services/alumnoService";

export default function EditarAlumnoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    email: "",
    dni: "",
    direccion: "",
    fechanacimiento: "",
    nivelId: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;

    getAlumnoById(Number(id)).then((alumno) => {
      setForm({
        username: alumno.username,
        password: "", // no se trae del backend
        nombre: alumno.nombre,
        email: alumno.email,
        dni: alumno.dni,
        direccion: alumno.direccion,
        fechanacimiento: alumno.fechanacimiento,
        nivelId: 0, // si después lo querés mostrar, se ajusta
      });
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateAlumno(Number(id), {
        ...form,
        nivelId: Number(form.nivelId),
      });

      alert("Alumno actualizado");
      navigate("/");
    } catch (err: any) {
      console.error("ERROR PUT 👉", err);
      alert("Error al actualizar alumno");
    }
  };

  if (loading) return <p>Cargando alumno...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Editar alumno</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" value={form.username} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Nueva contraseña (opcional)"
          onChange={handleChange}
        />
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="dni" value={form.dni} onChange={handleChange} />
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
        <input
          name="nivelId"
          type="number"
          value={form.nivelId}
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
