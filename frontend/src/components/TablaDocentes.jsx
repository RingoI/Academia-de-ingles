import { useEffect } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { CheckCheckIcon, CheckCircle2 } from "lucide-react";

function TablaDocentes() {
  const { docentes, obtenerDocentes } = usuarioStore();

  useEffect(() => {
    obtenerDocentes();
  }, []);

  console.log("Docentes:  ", docentes);

  const cabecera = ["", "Nombre", "Email", "Direccion", "DNI", "Estado"];

  return (
    <div className="overflow-x-auto">
      <table className="table rounded-lg overflow-hidden">
        <thead className="bg-[#0d1526] text-white">
          <tr>
            {cabecera.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#0c1224] text-white">
          {docentes.map((d, idx) => (
            <tr key={d.id}>
              <th>{idx + 1}</th>
              <td>{d.nombre}</td>
              <td>{d.email}</td>
              <td>{d.direccion}</td>
              <td>{d.dni}</td>
              <td>{d.activo ? "Activo" : "Desactivado"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDocentes;
