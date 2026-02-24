import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const materialStore = create((set) => ({
	materiales: [],
	cursosDocente: [],

	obtenerEntregasPorDocente: async (id) => {
		try {
			const res = await axiosInstance.get(`/entregas/docente/${id}`);
			console.log("Res de obtenerEntregasPorDocente: ", res);
			set({ materiales: res.data });
		} catch (error) {
			console.log("Error en obtenerEntregasPorDocente: ", error);
		}
	},

	agregarMaterial: async (cursoId, docenteId, file) => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await axiosInstance.post(`/entregas/curso/${cursoId}/docente/${docenteId}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			console.log("Res AgregarMaterial: ", res);
		} catch (error) {
			console.log("Error en agregarMaterial: ", error);
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
}));
