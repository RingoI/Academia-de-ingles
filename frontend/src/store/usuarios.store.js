import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const usuarioStore = create((set) => ({
  alumnos: [],
  docentes: [],
  usuario: null,

  setUsuario: (usuario) => set({ usuario }),

  obtenerAlumnos: async () => {
    try {
      const res = await axiosInstance.get("/alumnos");
      set({ alumnos: res.data });
    } catch (error) {
      console.log("Error en obtenerAlumnos: ", error);
    }
  },

  obtenerDocentes: async () => {
    try {
      const res = await axiosInstance.get("/docentes");
      set({ docentes: res.data });
    } catch (error) {
      console.log("Error en obtenerDocentes: ", error);
    }
  },

  agregarAlumno: async (data) => {
    try {
      const res = await axiosInstance.post("/alumnos/create", data);
      console.log("Res agregar alumno: ", res);
      await usuarioStore.getState().obtenerAlumnos();
    } catch (error) {
      console.log("Error en agregarAlumno: ", error);
    }
  },

  agregarDocente: async (data) => {
    try {
      const res = await axiosInstance.post("/docentes/create", data);
      console.log("Res agregar docente: ", res);
      await usuarioStore.getState().obtenerDocentes();
    } catch (error) {
      console.log("Error en agregarDocente: ", error);
    }
  },

  modificarAlumno: async (id) => {
    try {
      console.log("entrando a modificar alumno", id);
      const res = await axiosInstance.patch(`/alumnos/${id}`);
      console.log("res: ", res);
      await usuarioStore.getState().obtenerAlumnos();
    } catch (error) {
      console.log("Error en modificar alumno: ", error);
    }
  },
  modificarDocente: async (id) => {
    try {
      console.log("entrando a modificar docente   ", id);
      const res = await axiosInstance.patch(`/docentes/${id}`);
      console.log("res: ", res);
      await usuarioStore.getState().obtenerDocentes();
    } catch (error) {
      console.log("Error en modificar docente ", error);
    }
  },
}));
