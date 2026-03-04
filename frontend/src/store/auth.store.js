import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

export const authStore = create(
  persist(
    (set) => ({
      // 1. Estado inicial del token
      token: null,
      isLoggingIn: false,
      rol: null,
      loading: false,

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);

          // Extraemos el token de la respuesta
          const tokenRecibido = res.data.token;

          // 2. CAMBIO CLAVE: Guardamos el token en el estado de Zustand
          // Esto permite que authStore.getState().token NO sea null
          set({ token: tokenRecibido });

          // Opcional: lo seguimos guardando en localStorage por si otros
          // archivos fuera de Zustand lo necesitan (como axiosInstance)
          localStorage.setItem("token", tokenRecibido);

          // 3. Obtenemos el rol después de tener el token seteado
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
          // El interceptor de axiosInstance debería usar el token que acabamos de setear
          const res = await axiosInstance.get("/auth/me");

          set({ rol: res.data.roles[0], loading: false });
        } catch (error) {
          console.log("Error en obtenerRol: ", error);
          set({ rol: null, loading: false });
        }
      },

      // 4. Agregamos una función para cerrar sesión y limpiar todo
      logout: () => {
        set({ token: null, rol: null });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage", // Nombre de la key en localStorage
      // storage: createJSONStorage(() => localStorage) // Versiones nuevas de Zustand usan esto
    },
  ),
);
//Los username tendrían que ser unicos porque si hay dos iguales con distintos roles puede traer errores
//De ultima lo que se verifique en el /me tiene que ser por email y no por username.
