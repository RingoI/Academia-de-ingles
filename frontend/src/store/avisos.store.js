import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const avisoStore = create((set) => ({
	avisos: [],

	obtenerAvisos: async () => {
		try {
			const res = await axiosInstance.get("/avisos");
			console.log("Res Avisos: ", res);
			set({ avisos: res.data });
		} catch (error) {
			console.log("Error en obtenerAvisos: ", error);
		}
	},

	crearAviso: async (data) => {
		try {
			await axiosInstance.post("/avisos", data);
			await avisoStore.getState().obtenerAvisos();
		} catch (error) {
			console.log("Error en crearAviso: ", error);
		}
	},
}));
