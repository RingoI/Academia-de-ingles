import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const materialStore = create((set) => ({
  materiales: [],
  cursosDocente: [],
  isDownloading: false,
  archivosCurso: [],

  obtenerEntregasPorDocente: async (id) => {
    try {
      const res = await axiosInstance.get(`/materiales/docente/${id}`);
      console.log("Res de obtenerEntregasPorDocente: ", res);
      set({ materiales: res.data });
    } catch (error) {
      console.log("Error en obtenerEntregasPorDocente: ", error);
    }
  },

  agregarMaterial: async (cursoId, docenteId, file, nombreArchivo) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("nombre", nombreArchivo);
      const res = await axiosInstance.post(
        `/materiales/curso/${cursoId}/docente/${docenteId}`,
        formData,
      );
      await materialStore.getState().obtenerEntregasPorDocente(docenteId);
      return res.status;
    } catch (error) {
      console.log("Error en agregarMaterial: ", error);
    }
  },

  descargarArchivos: async (id, nombreArchivo) => {
    set({ isDownloading: true });
    try {
      console.log("ID: ", id);
      const res = await axiosInstance.get(`/materiales/descargar/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDispoistion = res.headers["content-disposition"];
      let fileName = `${nombreArchivo}.pdf`;
      if (contentDispoistion) {
        const match = contentDispoistion.match(/filename="(.+)"/);
        if (match && match.length > 1) {
          fileName = match[1];
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      set({ isDownloading: false });
      console.log("Error en descargarArchivos: ", error);
    } finally {
      set({ isDownloading: false });
    }
  },

  eliminarArchivo: async (id, idUsuario) => {
    try {
      const res = await axiosInstance.delete(`/materiales/${id}`);
      console.log("Res eliminar archivo: ", res);
      materialStore.getState().obtenerEntregasPorDocente(idUsuario);
    } catch (error) {
      console.log("Error en eliminarArchivo: ", error);
    }
  },

  obtenerArchivosPorCurso: async (cursoId) => {
    try {
      const res = await axiosInstance.get(`/materiales/curso/${cursoId}`);
      console.log("res obtenerArchivosporCurso: ", res);
      set({ archivosCurso: res.data });
    } catch (error) {
      console.log("Error en obtenerArchivosPorCurso: ", error);
    }
  },

  obtenerCursosPorDocente: async (id) => {
    try {
      const res = await axiosInstance.get(`/cursos/docente/${id}`);
      console.log("Res de ObtenerCursosoPorDocente: ", res);
      set({ cursosDocente: res.data.data });
    } catch (error) {
      console.log("Error en obtenerCursosPorDocente: ", error);
    }
  },

  agregarContenido: async (cursoId, docenteId, file, nombre, tipo) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("nombre", nombre);
      formData.append("tipo", tipo);

      const res = await axiosInstance.post(
        `materiales/curso/${cursoId}/docente/${docenteId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.status;
    } catch (error) {
      console.log("Error en agregarContenido:", error);
      return error.response?.status;
    }
  },
}));
