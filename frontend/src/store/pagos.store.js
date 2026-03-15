import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const pagoStore = create((set) => ({
	cuponera: [],
	loadingCuponera: false,
	pagosAcreditados: [],

	obtenerCuponeraAlumno: async (alumnoId) => {
		try {
			const res = await axiosInstance.get(`/pagos/alumno/${alumnoId}`);
			console.log("res obtenercuponeraalumno: ", res);
			set({ cuponera: res.data.data });
		} catch (error) {
			console.log("Error en obtenerCuponeraAlumno: ", error);
		}
	},

	generarCuponera: async (data) => {
		set({ loadingCuponera: true });
		try {
			console.log("DATA: ", JSON.stringify(data));
			const res = await axiosInstance.post("/pagos/cuponera", data);
			console.log("Res generar cuponera: ", res);
			return res.status;
		} catch (error) {
			set({ loadingCuponera: false });
			const status = error.status;
			return status;
		} finally {
			set({ loadingCuponera: false });
		}
	},

	obtenerPagosAcreditados: async () => {
		try {
			const res = await axiosInstance.get("/pagos/acreditados");
			console.log("acreditados: ", res.data.data);
			set({ pagosAcreditados: res.data.data });
		} catch (error) {
			console.log("Ocurrio un error en obtenerPagosAcreditados: ", error);
		}
	},
}));
