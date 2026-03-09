import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
export const tareaStore = create((set) => ({
  tareas: [],
  examenes: [],
  isLoading: false,
  isCreating: false,

  obtenerTareasPorCurso: async (cursoId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/tareas/curso/${cursoId}`);
      set({ tareas: res.data, isLoading: false });
    } catch (error) {
      console.log("Error al obtener tareas", error);
      set({ isLoading: false });
    }
  },

  // 📌 Obtener examenes
  obtenerExamenes: async () => {
    try {
      const res = await axiosInstance.get(`/examenes`);
      set({ examenes: res.data });
    } catch (error) {
      console.log("Error al obtener examenes", error);
    }
  },

  obtenerExamenesPorCurso: async (cursoId) => {
    try {
      const res = await axiosInstance.get(`/examenes/curso/${cursoId}`);
      set({ examenes: res.data });
    } catch (error) {
      console.log("Error al obtener examenes del curso", error);
    }
  },

  crearTarea: async (data) => {
    try {
      set({ isCreating: true });

      const res = await axiosInstance.post(`/tareas/create`, data);

      set({ isCreating: false });

      return res.status;
    } catch (error) {
      console.log("Error al crear tarea", error);
      set({ isCreating: false });
      return error.response?.status;
    }
  },
  crearExamen: async (data) => {
    try {
      set({ isCreating: true });

      const res = await axiosInstance.post(`/examenes/create`, data);

      set({ isCreating: false });

      return res.status;
    } catch (error) {
      console.log("Error al crear examen", error);
      set({ isCreating: false });
      return error.response?.status;
    }
  },
}));
