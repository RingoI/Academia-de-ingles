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

	agregarDocente: async (data) => {
		try {
			const res = await axiosInstance.post("/docentes/create", data);
			console.log("Res agregar docente: ", res);
			await usuarioStore.getState().obtenerDocentes();
		} catch (error) {
			console.log("Error en agregarDocente: ", error);
		}
	},

	modificarAlumno: async (id, data) => {
		try {
			const res = await axiosInstance.put(`/alumnos/${id}`, data);
			console.log("res: ", res);
			if (res.status === 200) {
				usuarioStore.setState((state) => ({ alumnos: state.alumnos.map((a) => (a.id === id ? { ...a, ...data } : a)) }));
			}
		} catch (error) {
			console.log("Error en modificar alumno: ", error);
		}
	},

	modificarDocente: async (id, data) => {
		try {
			const res = await axiosInstance.put(`/docentes/${id}`, data);
			console.log("res: ", res);
			if (res.status === 200) {
				usuarioStore.setState((state) => ({ docentes: state.docentes.map((a) => (a.id === id ? { ...a, ...data } : a)) }));
			}
		} catch (error) {
			console.log("Error en modificar docentes: ", error);
		}
	},
}));
