import CarteleraPreview from "../components/cartelera/CarteleraPreview";

function DashboardPage() {
  return (
    <div>
      {/* HEADER DE SECCIÓN */}
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="mb-1">
          <h1 className="font-semibold text-3xl text-slate-400">
            Pizarra iterativa
          </h1>
          <p className="text-slate-400">Informacion de sobre los cursos</p>
        </div>
      </header>

      <div className="border-b border-slate-400 mt-2 mb-0"></div>

      <CarteleraPreview />
    </div>
  );
}

export default DashboardPage;
