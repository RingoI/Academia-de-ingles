import { axiosInstance } from "./axios";

export const CursosService = {
	// Listar todos los cursos para la página principal de Administración
	obtenerTodos: async () => {
		const response = await axiosInstance.get("/cursos");
		return response.data;
	},

	// Obtener los datos de un curso específico (C1, A1, etc.)
	obtenerPorId: async (id) => {
		const response = await axiosInstance.get(`/cursos/${id}`);
		return response.data;
	},

	// Asignar Alumno a Curso
	asignarAlumno: async (cursoId, alumnoId) => {
		const response = await axiosInstance.post(`/cursos/${cursoId}/asignar-alumno/${alumnoId}`);
		return response.data;
	},

	obtenerCursosAlumno: async (alumnoId) => {
		const response = await axiosInstance.get(`/cursos/${alumnoId}`);
		return response.data;
	},

	// Buscar alumnos que aún no tienen nivel/curso asignado
	getAlumnosSinCurso: async () => {
		const response = await axiosInstance.get("/alumnos/sin-curso");
		return response.data;
	},

	// Listar todos los docentes para la columna de "Disponibles"
	getDocentes: async () => {
		const response = await axiosInstance.get("/docentes");
		return response.data;
	},

	// Asignar Docente a Curso
	asignarDocente: async (cursoId, docenteId) => {
		const response = await axiosInstance.post(`/cursos/${cursoId}/asignar-docente/${docenteId}`);
		return response.data;
	},

	crear: async (nuevoCursoDTO) => {
		const response = await axiosInstance.post("/cursos", nuevoCursoDTO);
		return response.data;
	},

	desvincularAlumno: async (cursoId, alumnoId) => {
		const response = await axiosInstance.delete(`/cursos/${cursoId}/desvincular-alumno/${alumnoId}`);
		return response.data;
	},
	desvincularDocente: async (cursoId, docenteId) => {
		const response = await axiosInstance.delete(`/cursos/${cursoId}/desvincular-docente/${docenteId}`);
		return response.data;
	},
};
