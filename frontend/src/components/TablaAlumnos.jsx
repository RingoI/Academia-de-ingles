import React, { useEffect, useState } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { Ban, CheckCircle2, SquarePen, XCircle } from "lucide-react";
import FormularioAlumnos from "./FormularioAlumnos";

function TablaAlumnos() {
  const { alumnos, obtenerAlumnos, modificarAlumno } = usuarioStore();
  const [editarAlumno, setEditarAlumno] = useState(false);
  const [datosAlumno, setDatosAlumno] = useState({});

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const cabecera = [
    "",
    "Nombre",
    "Email",
    "Direccion",
    "DNI",
    "Estado",
    "Acciones",
  ];

  console.log("alumnos: ", alumnos);

  return (
    <div className="overflow-x-auto">
      <div
        className={`${editarAlumno ? "fixed inset-0 ml-60" : "hidden"} z-10 flex items-center justify-center bg-black/50`}
      >
        <FormularioAlumnos
          key={datosAlumno.id}
          abrirFormularioAlumnos={editarAlumno}
          setAbrirFormularioAlumnos={setEditarAlumno}
          values={datosAlumno}
        />
      </div>
      <table className="table rounded-lg overflow-hidden">
        <thead className="bg-[#0d1526]">
          <tr>
            {cabecera.map((c) => (
              <th>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#0c1224]">
          {alumnos.map((a, idx) => (
            <tr>
              <th>{idx + 1}</th>
              <td>{a.nombre}</td>
              <td>{a.email}</td>
              <td>{a.direccion}</td>
              <td>{a.dni}</td>
              <td>
                {a.estado ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-sm font-semibold">Activo</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="size-4 text-red-500" />
                    <span className="text-sm font-semibold">Desactivado</span>
                  </div>
                )}
              </td>
              <td className="flex gap-2 text-slate-300">
                {a.estado ? (
                  <span>
                    <Ban
                      className="size-5 cursor-pointer"
                      onClick={() =>
                        modificarAlumno(a.id, { ...a, estado: false })
                      }
                    />
                  </span>
                ) : (
                  <span>
                    <CheckCircle2
                      className="size-5 cursor-pointer hover:text-green-500"
                      onClick={() =>
                        modificarAlumno(a.id, { ...a, estado: true })
                      }
                    />
                  </span>
                )}
                <span>
                  <SquarePen
                    className="size-5 cursor-pointer"
                    onClick={() => {
                      (setEditarAlumno(!editarAlumno), setDatosAlumno(a));
                    }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaAlumnos;
