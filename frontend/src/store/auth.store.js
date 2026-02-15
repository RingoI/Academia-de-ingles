import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const authStore = create((set) => ({
	isLoggingIn: false,

	login: async (data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post("/auth/login", data);
			console.log("RES: ", res);
		} catch (error) {
			console.log("Error en login: ", error);
		} finally {
			set({ isLoggingIn: false });
		}
	},
}));
