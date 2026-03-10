import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { entregaStore } from "../../store/entrega.store";
import { ArrowLeft, FileDown, CheckCircle, Users } from "lucide-react";
import { materialStore } from "../../store/material.store";
import { File } from "lucide-react";
import { BookOpen } from "lucide-react";
import { cursoStore } from "../../store/cursos.store";
import { useMemo } from "react";
import { tareaStore } from "../../store/tarea.store";
import { authStore } from "../../store/auth.store";
import AsistenciaCurso from "../../pages/AsistenciaPage.jsx";
import ForoCurso from "../../components/foro/ForoCurso";

function DocenteCursoDetalle() {
  const { id: cursoId } = useParams();
  const navigate = useNavigate();
  const { obtenerEntregasPorCurso, entregas, corregirEntrega } = entregaStore();
  const [nota, setNota] = useState({});
  const [comentario, setComentario] = useState({});
  const { archivosCurso, obtenerArchivosPorCurso } = materialStore();
  const { cursoPorId, obtenerCursoPorId } = cursoStore();
  const { descargarArchivos } = materialStore();
  const { descargarEntrega } = entregaStore();
  const { crearTarea } = tareaStore();
  const { idUsuario } = authStore();
  const [nombreTarea, setNombreTarea] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const { crearExamen } = tareaStore();
  const [vistaActiva, setVistaActiva] = useState("archivos");

  const tareas = useMemo(
    () => entregas.filter((e) => e.tareaId !== null),
    [entregas],
  );

  const examenes = useMemo(
    () => entregas.filter((e) => e.examenId !== null),
    [entregas],
  );

  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const tareasAgrupadas = tareas.reduce((acc, ent) => {
    const key = ent.nombreTarea || "Tarea";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(ent);
    return acc;
  }, {});

  const [tareaSeleccionadaExamen, setTareaSeleccionadaExamen] = useState(null);

  const examenesAgrupados = examenes.reduce((acc, ent) => {
    const key = ent.examenNombre || "Examen";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(ent);

    return acc;
  }, {});

  const handleCorregir = async (entregaId) => {
    const status = await corregirEntrega(
      entregaId,
      nota[entregaId] || "",
      comentario[entregaId] || "",
    );
    if (status === 200) {
      alert("Entrega corregida");
      obtenerEntregasPorCurso(cursoId);
    }
  };

  const [tipoActividad, setTipoActividad] = useState("TAREA");

  const handleCrearActividad = async () => {
    if (!nombreTarea || !fechaEntrega) {
      alert("Completa todos los campos");
      return;
    }

    if (tipoActividad === "TAREA") {
      const status = await crearTarea({
        nombre: nombreTarea,
        cursoId,
        docenteId: idUsuario,
        fechaEntrega,
      });

      if (status === 201) {
        alert("Tarea creada");
        obtenerEntregasPorCurso(cursoId);
      }
    } else if (tipoActividad === "EXAMEN") {
      const status = await crearExamen({
        nombre: nombreTarea,
        cursoId,
        docenteId: idUsuario,
        tipo: "Autoevaluacion",
        puntajeMaximo: 10,
        fecha: fechaEntrega,
      });

      if (status === 201) {
        alert("Examen creado");
        obtenerEntregasPorCurso(cursoId);
      }
    }
    setNombreTarea("");
    setFechaEntrega("");
    setTipoActividad("TAREA");
  };

  useEffect(() => {
    obtenerEntregasPorCurso(cursoId);
    obtenerArchivosPorCurso(cursoId);
    obtenerCursoPorId(cursoId);
  }, [cursoId]);

  return (
    <div>
      <header className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-inner">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="group p-3 bg-slate-800 hover:bg-blue-600 rounded-2xl transition-all duration-300 shadow-lg"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="font-semibold text-3xl text-slate-400">
                {cursoPorId?.nombre}
              </h1>
              <p className="text-slate-400 flex items-center gap-2 mt-1 italic">
                <BookOpen size={14} /> Archivos del curso
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto mb-6 flex gap-4">
        <button
          onClick={() => setVistaActiva("archivos")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            vistaActiva === "archivos"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Archivos
        </button>

        <button
          onClick={() => setVistaActiva("actividades")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            vistaActiva === "actividades"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Actividades
        </button>

        <button
          onClick={() => setVistaActiva("entregas")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            vistaActiva === "entregas"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Entregas
        </button>

        <button
          onClick={() => setVistaActiva("alumnos")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            vistaActiva === "alumnos"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Alumnos
        </button>
        <button
          onClick={() => setVistaActiva("asistencia")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            vistaActiva === "asistencia"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Asistencia
        </button>
      </div>

      <button
        onClick={() => setVistActiva("foro")}
        className={`pb-2 font-semibold ${
          tabActiva === "foro"
            ? "text-[#06b6d4] border-b-2 border-[#06b6d4]"
            : "text-slate-400 hover:text-white"
        }`}
      >
        Foro
      </button>

      <main className="max-w-7xl mx-auto gap-10">
        {/* ARCHIVOS DOCENTE */}
        {vistaActiva === "archivos" && (
          <section className="bg-slate-900/50 rounded-2xl border  border-slate-800 p-6 shadow-2xl overflow-y-scroll h-130 flex flex-col transition-all hover:border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 ">
                <File size={22} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-400">
                Archivos subidos por el Docente
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              {archivosCurso?.map((arc, idx) => (
                <div
                  key={idx}
                  className="border border-slate-800 p-6 bg-slate-900/50 rounded-2xl grid grid-cols-4 gap-5 items-center"
                >
                  <span className="text-lg font-black ">{arc.nombre}</span>
                  <span className="font-semibold w-30">{arc.fechaSubida}</span>
                  {arc.tipo === "MATERIAL" ? (
                    <span className="bg-[#818df851] w-30 text-center  px-2 rounded-xl py-1 font-semibold text-[#818df8ef]">
                      MATERIAL
                    </span>
                  ) : (
                    <>
                      {arc.tipo === "TAREA" ? (
                        <span className="bg-[#06b5d446] w-30 text-center px-3 py-1 rounded-xl font-semibold text-[#06b6d4]">
                          TAREA
                        </span>
                      ) : (
                        <span className="bg-[#db80363e] px-3 rounded-xl text-center w-30 py-1 font-semibold text-[#db7f36]">
                          EXAMEN
                        </span>
                      )}
                    </>
                  )}
                  <div
                    className="flex gap-1 cursor-pointer items-center bg-emerald-700 w-40 justify-center py-1.5 rounded-xl"
                    onClick={() => descargarArchivos(arc.id, arc.nombre)}
                  >
                    <span className="font-black">Descargar</span>
                    <FileDown />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {vistaActiva === "actividades" && (
          <section className="bg-slate-900 border border-slate-700 p-6 rounded-xl mt-10">
            <h2 className="text-xl font-bold mb-4">Crear Actividad</h2>

            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <input
                type="text"
                placeholder="Nombre de la actividad"
                className="input"
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
              />

              <input
                type="date"
                className="input"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />

              <select
                className="input w-40"
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}
              >
                <option value="TAREA">Tarea</option>
                <option value="EXAMEN">Examen</option>
              </select>

              <button
                onClick={handleCrearActividad}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded transition"
              >
                Crear
              </button>
            </div>
          </section>
        )}

        {/* Tareas */}
        {vistaActiva === "entregas" && (
          <>
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-slate-200">
                📚 Entregas de Tareas
              </h2>

              {Object.keys(tareasAgrupadas).length === 0 ? (
                <p className="text-slate-400">No hay entregas de tareas aún</p>
              ) : (
                <div className="space-y-6">
                  {Object.entries(tareasAgrupadas).map(
                    ([nombreTarea, entregas]) => (
                      <div key={nombreTarea} className="space-y-4">
                        {/* BOTON TAREA */}
                        <button
                          onClick={() =>
                            setTareaSeleccionada(
                              tareaSeleccionada === nombreTarea
                                ? null
                                : nombreTarea,
                            )
                          }
                          className="w-full text-left bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl text-white font-semibold transition"
                        >
                          📂 {nombreTarea} ({entregas.length} entregas)
                        </button>

                        {/* ENTREGAS */}
                        {tareaSeleccionada === nombreTarea && (
                          <div className="space-y-4">
                            {entregas.map((ent) => (
                              <div
                                key={ent.id}
                                className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-5 flex justify-between items-center shadow-md hover:shadow-lg transition"
                              >
                                {/* INFO */}
                                <div className="space-y-1">
                                  <p className="text-lg font-semibold text-white">
                                    👤{" "}
                                    {ent.alumnoNombre ||
                                      ent.alumno?.username ||
                                      "Alumno"}
                                  </p>

                                  <p className="text-sm text-slate-300">
                                    📄 {ent.nombreArchivo}
                                  </p>

                                  <p className="text-sm text-slate-400">
                                    📅 {ent.fechaSubida}
                                  </p>

                                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-300">
                                    {ent.estado || "PENDIENTE"}
                                  </span>
                                </div>

                                {/* ACCIONES */}
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      descargarEntrega(
                                        ent.id,
                                        ent.nombreArchivo,
                                      )
                                    }
                                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
                                  >
                                    ⬇ Descargar
                                  </button>

                                  <input
                                    type="number"
                                    placeholder="Nota"
                                    className="w-20 bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-sm"
                                    value={nota[ent.id] || ""}
                                    onChange={(e) =>
                                      setNota({
                                        ...nota,
                                        [ent.id]: e.target.value,
                                      })
                                    }
                                  />

                                  <input
                                    type="text"
                                    placeholder="Comentario"
                                    className="bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-sm w-40"
                                    value={comentario[ent.id] || ""}
                                    onChange={(e) =>
                                      setComentario({
                                        ...comentario,
                                        [ent.id]: e.target.value,
                                      })
                                    }
                                  />

                                  <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                    onClick={() => handleCorregir(ent.id)}
                                  >
                                    ✔ Corregir
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>

            {/* Exámenes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-slate-200">
                📚 Entregas de examenes
              </h2>

              {Object.keys(examenesAgrupados).length === 0 ? (
                <p className="text-slate-400">
                  No hay entregas de examenes aún
                </p>
              ) : (
                <div className="space-y-6">
                  {Object.entries(examenesAgrupados).map(
                    ([nombreExamen, entregas]) => (
                      <div key={nombreExamen} className="space-y-4">
                        {/* BOTON EXAMEN */}
                        <button
                          onClick={() =>
                            setTareaSeleccionadaExamen(
                              tareaSeleccionadaExamen === nombreExamen
                                ? null
                                : nombreExamen,
                            )
                          }
                          className="w-full text-left bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl text-white font-semibold transition"
                        >
                          📂 {nombreExamen} ({entregas.length} entregas)
                        </button>

                        {/* ENTREGAS */}
                        {tareaSeleccionadaExamen === nombreExamen && (
                          <div className="space-y-4">
                            {entregas.map((ent) => (
                              <div
                                key={ent.id}
                                className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-5 flex justify-between items-center shadow-md hover:shadow-lg transition"
                              >
                                {/* INFO */}
                                <div className="space-y-1">
                                  <p className="text-lg font-semibold text-white">
                                    👤{" "}
                                    {ent.alumnoNombre ||
                                      ent.alumno?.username ||
                                      "Alumno"}
                                  </p>

                                  <p className="text-sm text-slate-300">
                                    📄 {ent.nombreArchivo}
                                  </p>

                                  <p className="text-sm text-slate-400">
                                    📅 {ent.fechaSubida}
                                  </p>

                                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-300">
                                    {ent.estado || "PENDIENTE"}
                                  </span>
                                </div>

                                {/* ACCIONES */}
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      descargarEntrega(
                                        ent.id,
                                        ent.nombreArchivo,
                                      )
                                    }
                                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
                                  >
                                    ⬇ Descargar
                                  </button>

                                  <input
                                    type="number"
                                    placeholder="Nota"
                                    className="w-20 bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-sm"
                                    value={nota[ent.id] || ""}
                                    onChange={(e) =>
                                      setNota({
                                        ...nota,
                                        [ent.id]: e.target.value,
                                      })
                                    }
                                  />

                                  <input
                                    type="text"
                                    placeholder="Comentario"
                                    className="bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-sm w-40"
                                    value={comentario[ent.id] || ""}
                                    onChange={(e) =>
                                      setComentario({
                                        ...comentario,
                                        [ent.id]: e.target.value,
                                      })
                                    }
                                  />

                                  <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                    onClick={() => handleCorregir(ent.id)}
                                  >
                                    ✔ Corregir
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>
          </>
        )}

        {vistaActiva === "alumnos" && (
          <section className="bg-slate-900/50 rounded-2xl border mt-10 border-slate-800 p-6 shadow-2xl -h-130 overflow-y-scroll flex flex-col transition-all hover:border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl  border border-emerald-500/20 text-emerald-400">
                <CheckCircle size={22} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-400">
                Alumnos inscritos
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {cursoPorId?.alumnos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-2xl">
                  <p className="text-sm font-medium">Sin alumnos vinculados</p>
                </div>
              ) : (
                cursoPorId?.alumnos?.map((alumno, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                        {alumno.nombre?.charAt(0) || "A"}
                      </div>
                      <span className="text-slate-200 font-medium">
                        {alumno.nombre || alumno}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
        {vistaActiva === "asistencia" && (
          <section className="bg-slate-900/50 rounded-2xl border mt-10 border-slate-800 p-6 shadow-2xl h-[650px] overflow-y-scroll flex flex-col transition-all hover:border-slate-700/50">
            <AsistenciaCurso cursoId={cursoId} />
          </section>
        )}

        {/* TAB FORO */}
        {tabActiva === "foro" && (
          <div>{cursoPorId && <ForoCurso cursoId={cursoPorId.id} />}</div>
        )}
      </main>
    </div>
  );
}

export default DocenteCursoDetalle;
