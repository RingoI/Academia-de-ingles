import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAlumno } from "../Services/alumnoService";

export default function CrearAlumnoPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAlumno({
        ...form,
        nivelId: Number(form.nivelId),
      });

      alert("Alumno creado");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creando alumno");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Crear alumno</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="dni" placeholder="DNI" onChange={handleChange} />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <input name="fechanacimiento" type="date" onChange={handleChange} />
        <input
          name="nivelId"
          type="number"
          placeholder="Nivel ID"
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Crear alumno
        </button>
      </form>
    </div>
  );
}
