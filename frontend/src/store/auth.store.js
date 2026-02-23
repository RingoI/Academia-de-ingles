import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

export const authStore = create(
	persist(
		(set) => ({
			isLoggingIn: false,
			rol: null,
			loading: false,

			login: async (data, rolSeleccionado) => {
				set({ isLoggingIn: true });
				try {
					const res = await axiosInstance.post(rolSeleccionado.endpoint, data);
					console.log("Res Login: ", res);
					localStorage.setItem("token", res.data.token);
					await authStore.getState().obtenerRol();
					return res.status;
				} catch (error) {
					console.log("Error en login: ", error);
				} finally {
					set({ isLoggingIn: false });
				}
			},

			obtenerRol: async () => {
				set({ loading: true });
				try {
					const res = await axiosInstance.get("/auth/me");
					console.log("res rol: ", res.data.roles);
					set({ rol: res.data.roles[0], loading: false });
				} catch (error) {
					console.log("Error en obtenerRol: ", error);
					set({ rol: null, loading: false });
				}
			},
		}),
		{ name: "auth-storage", getStorage: () => localStorage },
	),
);

//Los username tendrían que ser unicos porque si hay dos iguales con distintos roles puede traer errores
//De ultima lo que se verifique en el /me tiene que ser por email y no por username.
