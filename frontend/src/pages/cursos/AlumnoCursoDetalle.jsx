import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cursoStore } from "../../store/cursos.store";
import TablaTareasAlumno from "../../components/TablaTareasAlumnos";
import { authStore } from "../../store/auth.store";
import HistorialEntregasAlumno from "../../components/HistorialEntregasAlumno";
import { materialStore } from "../../store/material.store";
import ForoCurso from "../../components/foro/ForoCurso";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  File,
  FileDown,
  ClipboardList,
  Users,
} from "lucide-react";
function AlumnoCursoDetalle() {
  const { id } = useParams();

  const { obtenerArchivosPorCurso, archivosCurso, descargarArchivos } =
    materialStore();

  const { obtenerCursoPorId, cursoPorId } = cursoStore();

  const navigate = useNavigate();

  const { idUsuario } = authStore();
  const [vistaActiva, setVistaActiva] = useState("materiales");

  useEffect(() => {
    obtenerCursoPorId(id);
    obtenerArchivosPorCurso(id);
  }, []);

  return (
    <div>
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="mb-1 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="font-semibold text-3xl text-slate-400">
              {cursoPorId?.nombre}
            </h1>

            <p className="text-slate-400">Cursos</p>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-400 mt-2 mb-6"></div>
      <div className="max-w-7xl mx-auto mb-8 flex gap-4">
        <button
          onClick={() => setVistaActiva("materiales")}
          className={`pb-2 font-semibold ${
            vistaActiva === "materiales"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Materiales
        </button>

        <button
          onClick={() => setVistaActiva("actividades")}
          className={`pb-2 font-semibold ${
            vistaActiva === "actividades"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Actividades
        </button>

        <button
          onClick={() => setVistaActiva("historial")}
          className={`pb-2 font-semibold ${
            vistaActiva === "historial"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Historial
        </button>

        <button
          onClick={() => setVistaActiva("foro")}
          className={`pb-2 font-semibold ${
            vistaActiva === "foro"
              ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Foro
        </button>
      </div>

      <main className="max-w-7xl mx-auto gap-10">
        {/* ARCHIVOS DOCENTE */}

        {vistaActiva === "materiales" && (
          <section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 shadow-2xl min-h-130 flex flex-col transition-all hover:border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <File size={22} />
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-400">
                Archivos subidos por el docente
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {archivosCurso.map((arc, idx) => (
                <div
                  key={idx}
                  className="border border-slate-800 p-6 bg-slate-900/50 rounded-2xl grid grid-cols-4 gap-5 items-center"
                >
                  <span className="text-lg font-black">{arc.nombre}</span>

                  <span className="font-semibold w-30">{arc.fechaSubida}</span>

                  {arc.tipo === "MATERIAL" ? (
                    <span className="bg-[#818df851] w-30 text-center px-2 rounded-xl py-1 font-semibold text-[#818df8ef]">
                      MATERIAL
                    </span>
                  ) : arc.tipo === "TAREA" ? (
                    <span className="bg-[#06b5d446] w-30 text-center px-3 py-1 rounded-xl font-semibold text-[#06b6d4]">
                      TAREA
                    </span>
                  ) : (
                    <span className="bg-[#db80363e] px-3 rounded-xl text-center w-30 py-1 font-semibold text-[#db7f36]">
                      EXAMEN
                    </span>
                  )}

                  <div
                    className="flex gap-1 cursor-pointer items-center bg-emerald-700 hover:bg-emerald-600 transition w-40 justify-center py-1.5 rounded-xl"
                    onClick={() => descargarArchivos(arc.id, arc.nombre)}
                  >
                    <span className="font-black">Descargar</span>
                    <FileDown size={18} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Actividades del curso */}
        {vistaActiva === "actividades" && (
          <section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                <CheckCircle size={22} />
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-400">
                Actividades del curso
              </h2>
            </div>

            <TablaTareasAlumno cursoId={id} alumnoId={idUsuario} />
          </section>
        )}

        {/* HISTORIAL DE ENTREGAS */}
        {vistaActiva === "historial" && (
          <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl text-purple-500 border border-purple-400">
                <ClipboardList size={22} />
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Historial de entregas
              </h2>
            </div>

            <HistorialEntregasAlumno alumnoId={idUsuario} />
          </section>
        )}

        {/* TAB FORO */}

        {vistaActiva === "foro" && (
          <div>{cursoPorId && <ForoCurso cursoId={cursoPorId.id} />}</div>
        )}
      </main>
    </div>
  );
}

export default AlumnoCursoDetalle;
