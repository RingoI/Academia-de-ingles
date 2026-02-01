import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as loginService } from "../Services/authService";
import type { AuthMeResponse } from "../Types/auth";

interface AuthContextType {
  user: AuthMeResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔁 Al iniciar la app: si hay token → auth/me
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await loginService({ username, password });

    if (!res?.token) {
      console.error("Respuesta inválida del login", res);
      throw new Error("Token no recibido");
    }

    // 🔥 Guardamos el token SIN tocarlo
    localStorage.setItem("token", res.token.replace("Bearer ", ""));

    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook lindo
export const useAuth = () => useContext(AuthContext);
