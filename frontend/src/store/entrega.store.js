import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
export const entregaStore = create((set) => ({
  isUploading: false,
  entregas: [],
  historial: [],

  subirEntregaTarea: async (tareaId, alumnoId, file, nombre) => {
    try {
      set({ isUploading: true });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("nombre", nombre);

      const res = await axiosInstance.post(
        `/entregas/tarea/${tareaId}/alumno/${alumnoId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      set({ isUploading: false });
      return res.status;
    } catch (error) {
      console.log("Error al subir tarea", error);
      set({ isUploading: false });
      return error.response?.status;
    }
  },

  subirEntregaExamen: async (examenId, alumnoId, file, nombre) => {
    try {
      set({ isUploading: true });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("nombre", nombre);

      const res = await axiosInstance.post(
        `/entregas/examen/${examenId}/alumno/${alumnoId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      set({ isUploading: false });
      return res.status;
    } catch (error) {
      console.log("Error al subir examen", error);
      set({ isUploading: false });
      return error.response?.status;
    }
  },

  corregirEntrega: async (entregaId, nota, comentario) => {
    try {
      const res = await axiosInstance.put(`/entregas/${entregaId}/corregir`, {
        nota,
        comentario,
      });

      return res.status;
    } catch (error) {
      console.log("Error al corregir", error);
      return error.response?.status || 500;
    }
  },
  obtenerEntregasPorCurso: async (cursoId) => {
    try {
      const res = await axiosInstance.get(`/entregas/curso/${cursoId}`);
      set({ entregas: res.data });
    } catch (err) {
      console.error(err);
    }
  },
  descargarEntrega: async (entregaId, nombreArchivo) => {
    try {
      const response = await axiosInstance.get(
        `/entregas/download/${entregaId}`,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);

      link.click();
      link.remove();
    } catch (error) {
      console.error("Error descargando entrega", error);
    }
  },

  // opcional: filtrar por tarea
  entregasPorTarea: (tareaId) =>
    get().entregas.filter((e) => e.tareaId === tareaId),

  obtenerHistorialAlumno: async (alumnoId) => {
    try {
      const res = await axiosInstance.get(`/entregas/alumno/${alumnoId}`);
      console.log("Historial obtenido:", res.data);
      set({ historial: res.data });

      return res.data;
    } catch (error) {
      console.log("Error al obtener historial", error);

      return [];
    }
  },

  reentregar: async (entregaId, file, nombre) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("nombre", nombre);

      const res = await axiosInstance.put(
        `/entregas/reentrega/${entregaId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.status;
    } catch (error) {
      console.log("Error al reentregar", error);
      return error.response?.status || 500;
    }
  },
}));
