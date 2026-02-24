import React, { useEffect } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { CheckCircle2 } from "lucide-react";

function TablaAlumnos() {
  const { alumnos, obtenerAlumnos } = usuarioStore();

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  console.log("Alumnos:  ", alumnos);

  const cabecera = ["", "Nombre", "Email", "Direccion", "DNI", "Estado"];

  return (
    <div className="overflow-x-auto">
      <table className="table rounded-lg overflow-hidden">
        <thead className="bg-[#0d1526]">
          <tr>
            {cabecera.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#0c1224]">
          {alumnos.map((a, idx) => (
            <tr key={a.id}>
              <th>{idx + 1}</th>
              <td>{a.nombre}</td>
              <td>{a.email}</td>
              <td>{a.direccion}</td>
              <td>{a.dni}</td>
              <td>{a.activo ? "Activo" : "Desactivado"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaAlumnos;
