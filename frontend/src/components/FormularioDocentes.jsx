import { useState } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { UserRoundPlus, X } from "lucide-react";
import TextInput from "./TextInput";

function FormularioDocentes({
  abrirFormularioDocentes,
  setAbrirFormularioDocentes,
  values = {},
}) {
  const { agregarDocente, modificarDocente } = usuarioStore();

  const [formularioDocentes, setFormularioDocentes] = useState({
    nombre: values.nombre || "",
    titulo: values.titulo || "",
    email: values.email || "",
    username: values.username || "",
    password: "",
    fechanacimiento: values.fechanacimiento || "",
    cuit: values.cuit || "",
    direccion: values.direccion || "",
    telefono: values.telefono || "",
    activo: true,
    estado: true,
  });

  function handleSubmit(e) {
    e.preventDefault();

    const data = { ...formularioDocentes };

    if (values.id && !data.password) {
      delete data.password;
    }

    if (!values.id) {
      agregarDocente(data);
    } else {
      modificarDocente(values.id, data);
    }

    setAbrirFormularioDocentes(false);
  }

  return (
    <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
    {/* HEADER */}
    <div className="flex items-center justify-between gap-3 border-b border-slate-700 p-5 bg-slate-900/50">
      
      <div className="flex items-center gap-4">
        <UserRoundPlus className="bg-[#0c354b] text-[#818cf8] size-12 p-2.5 rounded-xl" />
        
        <div>
          <h1 className="font-bold text-xl text-white">
            {values.id ? "Modificar Docente" : "Nuevo Docente"}
          </h1>
          <p className="text-sm text-slate-400">
            Completa los datos para registrar al docente.
          </p>
        </div>
      </div>

      <button
        onClick={() => setAbrirFormularioDocentes(false)}
        className="text-slate-500 hover:text-white transition-colors p-2"
      >
        <X size={24} />
      </button>

    </div>

      {/* FORM */}
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 p-5 gap-5">
          <TextInput
            tag="NOMBRE COMPLETO"
            placeholder="Ej: Juan Perez"
            value={formularioDocentes.nombre}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                nombre: e.target.value,
              })
            }
          />

          <TextInput
            tag="TITULO"
            placeholder="Ej: C2"
            value={formularioDocentes.titulo}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                titulo: e.target.value,
              })
            }
          />

          <TextInput
            tag="EMAIL"
            placeholder="juan.perez@example.com"
            value={formularioDocentes.email}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                email: e.target.value,
              })
            }
          />

          <TextInput
            tag="USERNAME"
            placeholder="jperez_docente"
            value={formularioDocentes.username}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                username: e.target.value,
              })
            }
          />

          <TextInput
            tag="CONTRASEÑA"
            type="password"
            placeholder="••••••••"
            value={formularioDocentes.password}
            required={!values.id}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                password: e.target.value,
              })
            }
          />

          <TextInput
            tag="FECHA DE NACIMIENTO"
            type="date"
            value={formularioDocentes.fechanacimiento}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                fechanacimiento: e.target.value,
              })
            }
          />

          <TextInput
            tag="CUIT"
            placeholder="23-12345678-9"
            value={formularioDocentes.cuit}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                cuit: e.target.value,
              })
            }
          />

          <TextInput
            tag="DIRECCIÓN"
            placeholder="Calle Ejemplo 123"
            value={formularioDocentes.direccion}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                direccion: e.target.value,
              })
            }
          />

          <TextInput
            tag="TELÉFONO"
            placeholder="+54 9 2477 123456"
            value={formularioDocentes.telefono}
            onChange={(e) =>
              setFormularioDocentes({
                ...formularioDocentes,
                telefono: e.target.value,
              })
            }
          />
        </div>

        {/* FOOTER BOTONES */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-700 px-6 py-5 bg-slate-900/30">
          <button
              className="px-5 py-2 rounded-lg text-slate-400 font-semibold hover:text-white transition-colors cursor-pointer"
              onClick={() => setAbrirFormularioDocentes(false)}
              type="button"
          >
          Cancelar
          </button>

          <button
            type="submit"
            className="bg-[#06b6d4] shadow-lg shadow-cyan-500/20 hover:bg-[#0891b2] px-6 py-2 rounded-lg font-bold text-[#0c1224] transition-all active:scale-95 cursor-pointer"
          >
            Guardar Docente
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioDocentes;