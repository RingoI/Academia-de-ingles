import { useState } from "react";
import { ShieldUser, Users } from "lucide-react";
import TablaAlumnos from "../components/TablaAlumnos";
import TablaDocentes from "../components/TablaDocentes";
import FormularioAlumnos from "../components/FormularioAlumnos";
import FormularioDocentes from "../components/FormularioDocentes"; 

function UsuariosPage() {
    const [abrirFormularioAlumnos, setAbrirFormularioAlumnos] = useState(false);
    const [abrirFormularioDocentes, setAbrirFormularioDocentes] = useState(false);
    const [tabActiva, setTabActiva] = useState("alumnos");
    const [busquedaAlumnos, setBusquedaAlumnos] = useState("");
    const [busquedaDocentes, setBusquedaDocentes] = useState("");

  return (
    <div className="h-full w-full relative">
      
      {/* MODAL FORM ALUMNOS */}
      {abrirFormularioAlumnos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <FormularioAlumnos
            abrirFormularioAlumnos={abrirFormularioAlumnos}
            setAbrirFormularioAlumnos={setAbrirFormularioAlumnos}
          />
        </div>
      )}

      {/* MODAL FORM DOCENTES */}
      {abrirFormularioDocentes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setAbrirFormularioDocentes(false)}
          />

          {/* CONTENIDO MODAL */}
          <div
            className="relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <FormularioDocentes
              abrirFormularioDocentes={abrirFormularioDocentes}
              setAbrirFormularioDocentes={setAbrirFormularioDocentes}
            />
          </div>

        </div>
      )}

      {/* TITULO */}
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div className="mb-1">
					<h1 className="font-semibold text-3xl text-slate-400">
						Gestión de usuarios
					</h1>
					<p className="text-slate-400">
						Administra el acceso de alumnos y docentes
					</p>
				</div>
			</header>

      <div className="border-b border-slate-400 mt-2 mb-6"></div>
      
    {/* TABS */}
    <div className="flex gap-6 border-b border-slate-700 mt-6 mb-10">
    <button
        onClick={() => setTabActiva("alumnos")}
        className={`pb-2 font-semibold ${
        tabActiva === "alumnos"
            ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
            : "text-slate-400 hover:text-white"
        }`}
    >
        Alumnos
    </button>

    <button
        onClick={() => setTabActiva("docentes")}
        className={`pb-2 font-semibold ${
        tabActiva === "docentes"
            ? "text-[#818cf8] border-b-2 border-[#818cf8]"
            : "text-slate-400 hover:text-white"
        }`}
    >
        Docentes
    </button>
    </div>

    {/* CONTENIDO SEGUN TAB */}
    <div className="mt-10">

    {tabActiva === "alumnos" && (
        <div className="flex flex-col gap-2 text-[#06b6d4]">
            <div className="flex justify-between items-center">

              <div className="flex gap-2 items-center">
                <Users className="text-[#06b6d4] bg-[#0c1224] size-8 p-1 rounded-xl" />
                <h2 className="font-semibold text-xl">Alumnos registrados</h2>
              </div>

              <div className="flex gap-3 items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar alumno..."
                      className="bg-[#0c1224] border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-cyan-500"
                      value={busquedaAlumnos}
                      onChange={(e) => setBusquedaAlumnos(e.target.value)}
                    />

                    {busquedaAlumnos && (
                      <button
                        onClick={() => setBusquedaAlumnos("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                <button
                  className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-cyan-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer"
                  onClick={() => setAbrirFormularioAlumnos(true)}
                >
                  Agregar alumno
                </button>
              </div>

            </div>

            <TablaAlumnos busqueda={busquedaAlumnos} />
        </div>
    )}

    {tabActiva === "docentes" && (
        <div className="flex flex-col gap-2 text-[#818cf8]">

        <div className="flex justify-between items-center">

            <div className="flex gap-2 items-center">
              <ShieldUser className="text-[#818cf8] bg-[#0c1224] size-8 p-1 rounded-xl" />
              <h2 className="font-semibold text-xl">Docentes registrados</h2>
            </div>

            <div className="flex gap-3 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar docente..."
                    className="bg-[#0c1224] border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-indigo-500"
                    value={busquedaDocentes}
                    onChange={(e) => setBusquedaDocentes(e.target.value)}
                  />

                  {busquedaDocentes && (
                    <button
                      onClick={() => setBusquedaDocentes("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

              <button
                className="bg-[#818cf8] shadow-md transition-all duration-300 hover:shadow-indigo-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer"
                onClick={() => setAbrirFormularioDocentes(true)}
              >
                Agregar docente
              </button>
            </div>

          </div>

          <TablaDocentes busqueda={busquedaDocentes} />
        </div>
    )}

</div>

    </div>
  );
}

export default UsuariosPage;