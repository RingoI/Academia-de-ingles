import React, { useEffect } from "react";
import CuponeraPagos from "../components/CuponeraPagos";
import { authStore } from "../store/auth.store";
import { pagoStore } from "../store/pagos.store";
import TablaPagos from "../components/TablaPagos";

function PagosPage() {
  const { idUsuario, rol } = authStore();
  const { obtenerCuponeraAlumno, cuponera } = pagoStore();

  useEffect(() => {
    obtenerCuponeraAlumno(idUsuario);
  }, []);
  console.log("cupones", cuponera);

  return (
    <div>
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="mb-1">
          <h1 className="font-bold text-3xl text-slate-200">Pagos de Cursos</h1>
          <p className="text-slate-400">
            {" "}
            {rol === "ROLE_ADMIN"
              ? "Visualiza los pagos acreditados a la cuenta de Mercado Pago de la institución"
              : "Gestiona tus cuotas mensuales a traves de la cuponera"}
          </p>
        </div>
      </header>
      <div>
        {rol === "ROLE_ADMIN" ? (
          <TablaPagos />
        ) : (
          <CuponeraPagos items={cuponera} />
        )}
      </div>
    </div>
  );
}

export default PagosPage;
