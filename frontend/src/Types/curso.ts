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

export interface CursoResponse {
  id: number;
  nombre: string;
  niveles: { id: number; nombre: string }[];
  docentes: { id: number; nombre: string; apellido: string }[];
  alumnos: { id: number; nombre: string; apellido: string }[];
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

export interface UpdateCursoRequest {
  nombre?: string;
  nivelesIds?: number[];
  docentesIds?: number[];
  alumnosIds?: number[];
  cupo?: number;
  fechaInicio?: string;
  fechaFin?: string;
}
