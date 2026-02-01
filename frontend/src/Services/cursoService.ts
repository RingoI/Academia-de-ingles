import api from "../api/axios";
import type { Curso } from "../Types/curso";

export const getCursos = async (): Promise<Curso[]> => {
  const res = await api.get("/cursos");
  return res.data;
};
export const getCursoById = async (id: number): Promise<Curso> => {
  const res = await api.get(`/cursos/${id}`);
  return res.data;
};

export const createCurso = async (curso: Partial<Curso>): Promise<Curso> => {
  const res = await api.post("/cursos", curso);
  return res.data;
};

export const updateCurso = async (
  id: number,
  curso: Partial<Curso>,
): Promise<Curso> => {
  const res = await api.put(`/cursos/${id}`, curso);
  return res.data;
};

export const deleteCurso = async (id: number): Promise<void> => {
  await api.delete(`/cursos/${id}`);
};
