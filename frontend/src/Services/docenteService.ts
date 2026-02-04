import api from "../api/axios";
import type {
  Docente,
  CreateDocenteRequest,
  UpdateDocenteRequest,
} from "../Types/docente";

export const getDocentes = async () => {
  const res = await api.get("/docentes");
  return res.data;
};

export const getDocenteById = async (id: number): Promise<Docente> => {
  const res = await api.get(`/docentes/${id}`);
  return res.data;
};

export const createDocente = async (data: CreateDocenteRequest) => {
  await api.post("/docentes/create", data);
};

export const updateDocente = async (id: number, data: UpdateDocenteRequest) => {
  await api.put(`/docentes/${id}`, data);
};

export const deleteDocente = async (id: number) => {
  await api.delete(`/docentes/${id}`);
};
