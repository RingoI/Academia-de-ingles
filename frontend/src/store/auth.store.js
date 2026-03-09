import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

export const authStore = create(
  persist(
    (set) => ({
      token: null,
      isLoggingIn: false,
      rol: null,
      loading: false,
      idUsuario: null,
      nombre: "",

      login: async (data, rolSeleccionado) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post(rolSeleccionado.endpoint, data);

          console.log("Res Login: ", res);

          const tokenRecibido = res.data.token;

          // Guardamos token en Zustand
          set({ token: tokenRecibido });

          // Guardamos token en localStorage
          localStorage.setItem("token", tokenRecibido);

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

          console.log("res rol: ", res.data);

          set({
            rol: res.data.roles[0],
            nombre: res.data.nombre,
            idUsuario: res.data.id,
            loading: false,
          });
        } catch (error) {
          console.log("Error en obtenerRol: ", error);
          set({ rol: null, loading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("token");

        set({
          token: null,
          isLoggingIn: false,
          rol: null,
          loading: false,
          idUsuario: null,
          nombre: "",
        });
      },
    }),
    { name: "auth-storage", getStorage: () => localStorage },
  ),
);
