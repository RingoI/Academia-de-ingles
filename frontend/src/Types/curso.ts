export interface Curso {
  id: number;
  nombre: string;
  niveles: string[];
  docentes: string[];
  alumnos: string[];
  cupo: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface CreateCursoRequest {
  nombre: string;
  nivelesIds: number[];
  docentesIds: number[];
  alumnosIds: number[];
  cupo: number;
  fechaInicio: string;
  fechaFin: string;
}
