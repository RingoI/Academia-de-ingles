import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDocente } from "../Services/docenteService";

export default function CrearDocentePage() {
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
      await createDocente(form);
      alert("Docente creado correctamente");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creando docente");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Crear docente</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input name="titulo" placeholder="Título" onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="cuit" placeholder="CUIT" onChange={handleChange} />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <input name="fechanacimiento" type="date" onChange={handleChange} />

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
          Crear docente
        </button>
      </form>
    </div>
  );
}
