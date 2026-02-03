import api from "../api/axios";
import type {
  Alumno,
  CreateAlumnoRequest,
  UpdateAlumnoRequest,
} from "../Types/alumno";

export const getAlumnoById = async (id: number): Promise<Alumno> => {
  const res = await api.get(`/alumnos/${id}`);
  return res.data;
};

export const createAlumno = async (
  alumno: CreateAlumnoRequest,
): Promise<void> => {
  await api.post("/alumnos/create", alumno);
};

export const updateAlumno = async (
  id: number,
  alumno: UpdateAlumnoRequest,
): Promise<void> => {
  await api.put(`/alumnos/${id}`, alumno);
};

export const deleteAlumno = async (id: number): Promise<void> => {
  await api.delete(`/alumnos/${id}`);
};

export const getAlumnos = async () => {
  const res = await api.get("/alumnos");
  return res.data;
};
