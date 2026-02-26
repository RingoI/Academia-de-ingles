import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const cursoStore = create((set) => ({
	cursosAlumno: [],
	cursoPorId: null,

	obtenerCursosAlumno: async () => {
		try {
			const res = await axiosInstance.get(`/alumnos/mis-cursos`);
			console.log("Res de obtenerCursosAlumno: ", res.data);
			set({ cursosAlumno: res.data });
		} catch (error) {
			console.log("Error en obtenerCursosAlumno: ", error);
		}
	},

	obtenerCursoPorId: async (cursoId) => {
		try {
			const res = await axiosInstance.get(`/cursos/${cursoId}`);
			set({ cursoPorId: res.data });
		} catch (error) {
			console.log("Error en obtenerCursoPorId: ", error);
		}
	},
}));
