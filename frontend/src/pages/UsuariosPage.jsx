import { useState } from "react";
import TablaAlumnos from "../components/TablaAlumnos";
import { ShieldUser, Users } from "lucide-react";
import TablaDocentes from "../components/TablaDocentes";
import FormularioAlumnos from "../components/FormularioAlumnos";
import FormularioDocentes from "../components/FormularioDocentes";

function UsuariosPage() {
  const [abrirFormularioAlumnos, setAbrirFormularioAlumnos] = useState(false);
  const [abrirFormularioDocentes, setAbrirFormularioDocentes] = useState(false);

  return (
    <div className="h-full w-full relative">
      <div
        className={`${abrirFormularioAlumnos ? "fixed inset-0 ml-60" : "hidden"} z-10 flex items-center justify-center bg-black/50`}
      >
        <FormularioAlumnos
          abrirFormularioAlumnos={abrirFormularioAlumnos}
          setAbrirFormularioAlumnos={setAbrirFormularioAlumnos}
        />
      </div>
      <div
        className={`${abrirFormularioDocentes ? "fixed inset-0 ml-60" : "hidden"} z-10 flex items-center justify-center bg-black/50`}
      >
        <FormularioDocentes
          abrirFormularioDocentes={abrirFormularioDocentes}
          setAbrirFormularioDocentes={setAbrirFormularioDocentes}
        />
      </div>
      <div>
        <h1 className="font-semibold text-3xl text-[#818cf8]">
          Gestión de Usuarios
        </h1>
        <p className="text-slate-400">
          Administra el acceso de alumnos y docentes.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-2 text-[#06b6d4]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Users className="text-[#06b6d4] bg-[#0c1224] size-8 p-1 rounded-xl" />
            <h2 className="font-semibold text-xl">Alumnos Registrados</h2>
          </div>
          <button
            className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-cyan-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer"
            onClick={() => setAbrirFormularioAlumnos(!abrirFormularioAlumnos)}
          >
            Agregar Alumno
          </button>
        </div>
        <TablaAlumnos />
      </div>
      <div className="mt-10 flex flex-col gap-2 text-[#818cf8]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <ShieldUser className="text-[#818cf8] bg-[#0c1224] size-8 p-1 rounded-xl" />
            <h2 className="font-semibold text-xl">Docentes Registrados</h2>
          </div>
          <button className="bg-[#818cf8] shadow-md transition-all duration-300 hover:shadow-indigo-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer">
            Agregar Docente
          </button>
        </div>
        <TablaDocentes />
      </div>
    </div>
  );
}

export default UsuariosPage;
