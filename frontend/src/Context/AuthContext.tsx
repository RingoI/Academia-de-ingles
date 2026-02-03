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

const normalizeRoles = (roles: string[]) =>
  roles.map((r) => r.replace("ROLE_", ""));

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((data) =>
        setUser({
          username: data.username,
          roles: normalizeRoles(data.roles),
        }),
      )
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await loginService({ username, password });

    if (!res?.token) {
      throw new Error("Token no recibido");
    }

    localStorage.setItem("token", res.token.replace("Bearer ", ""));

    const me = await getMe();
    setUser({
      username: me.username,
      roles: normalizeRoles(me.roles),
    });
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

export const useAuth = () => useContext(AuthContext);
