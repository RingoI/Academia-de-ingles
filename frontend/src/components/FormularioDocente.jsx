import React, { useState } from "react";
import TextInput from "./TextInput";
import { GraduationCap } from "lucide-react";
import { usuarioStore } from "../store/usuarios.store";

function FormularioDocente({ abrirFormularioDocente, setAbrirFormularioDocente }) {

  const { agregarDocente } = usuarioStore();

  const [formularioDocente, setFormularioDocente] = useState({
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

  function handleSubmit(e) {
    e.preventDefault();
    agregarDocente(formularioDocente);
    setAbrirFormularioDocente(false);
  }

  return (
    <div className="bg-[#0f1629] w-160 min-h-100 flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border border-slate-700 p-3 rounded-t-xl">
        <GraduationCap className="bg-purple-900 text-purple-400 size-10 p-2 rounded-md" />
        <div>
          <h1 className="font-semibold text-xl text-white">Nuevo docente</h1>
          <p className="text-sm text-slate-400">
            Completa los datos para registrar al nuevo profesor.
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 p-5 gap-5">

          <TextInput
            tag="NOMBRE COMPLETO"
            placeholder="Ej: María López"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, nombre: e.target.value })
            }
          />

          <TextInput
            tag="EMAIL"
            placeholder="m.lopez@academy.com"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, email: e.target.value })
            }
          />

          <TextInput
            tag="USERNAME"
            placeholder="mlopez_doc"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, username: e.target.value })
            }
          />

          <TextInput
            tag="CONTRASEÑA"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, password: e.target.value })
            }
          />

          <TextInput
            tag="FECHA DE NACIMIENTO"
            type="date"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, fechanacimiento: e.target.value })
            }
          />

          <TextInput
            tag="CUIT"
            placeholder="20-12345678-9"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, cuit: e.target.value })
            }
          />

          <TextInput
            tag="TÍTULO"
            placeholder="Profesor de Inglés"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, titulo: e.target.value })
            }
          />

          <TextInput
            tag="DIRECCIÓN"
            placeholder="Calle Ejemplo 456"
            onChange={(e) =>
              setFormularioDocente({ ...formularioDocente, direccion: e.target.value })
            }
          />

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border border-slate-700 px-3 py-5 rounded-b-xl">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md text-slate-300 font-semibold"
            onClick={() => setAbrirFormularioDocente(false)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-purple-500 shadow-md transition-all duration-300 hover:shadow-purple-500/50 px-4 py-2 rounded-lg font-semibold text-slate-900 text-sm"
          >
            Guardar docente
          </button>
        </div>

      </form>
    </div>
  );
}

export default FormularioDocente;