import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const usuarioStore = create((set) => ({
	alumnos: [],
	docentes: [],

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
}));
