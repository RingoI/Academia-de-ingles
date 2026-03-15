import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const cursoStore = create((set) => ({
	cursosAlumno: [],
	cursoPorId: null,
	cursosAlumnoId: [],

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
			console.log("obteniendo info cursos");
			const res = await axiosInstance.get(`/cursos/${cursoId}`);
			console.log("res obtener curso: ", res);
			set({ cursoPorId: res.data });
		} catch (error) {
			console.log("Error en obtenerCursoPorId: ", error);
		}
	},

	obtenerCursoPorAlumnoId: async (alumnoId) => {
		try {
			console.log("Alumno id: ", alumnoId);
			const res = await axiosInstance.get(`/cursos/alumno/${alumnoId}`);
			console.log("Obtenercurso por alumno id: ", res);
			set({ cursosAlumnoId: res.data.map((c) => ({ id: c.id, nombre: c.nombre })) });
		} catch (error) {
			console.log("Error en obtenerCursoPorAlumnoId: ", error);
		}
	},
}));
