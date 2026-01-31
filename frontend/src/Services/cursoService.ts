import api from "../api/axios";
import type { Curso, CreateCursoRequest } from "../Types/curso";

export const getCursos = async (): Promise<Curso[]> => {
  const response = await api.get<Curso[]>("/cursos");
  return response.data;
};

export const getCursoById = async (id: number): Promise<Curso> => {
  const response = await api.get<Curso>(`/cursos/${id}`);
  return response.data;
};

export const createCurso = async (data: CreateCursoRequest): Promise<Curso> => {
  const response = await api.post<Curso>("/cursos", data);
  return response.data;
};
1;
