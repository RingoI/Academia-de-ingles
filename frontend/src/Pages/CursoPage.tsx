import { useEffect, useState } from "react";
import { getCursos } from "../Services/cursoService";
import type { Curso } from "../Types/curso";

const CursosPage = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    getCursos().then(setCursos);
  }, []);

  return (
    <div>
      <h2>Cursos</h2>
      {cursos.map((c) => (
        <div key={c.id}>
          <strong>{c.nombre}</strong> – cupo {c.cupo}
        </div>
      ))}
    </div>
  );
};

export default CursosPage;
