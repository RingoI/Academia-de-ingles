import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  const isAdminOrDocente =
    user?.roles.includes("ADMIN") || user?.roles.includes("DOCENTE");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white px-6 py-4 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Academia de Inglés</h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <p className="font-semibold">{user?.username}</p>
              <p className="text-indigo-200">{user?.roles}</p>
            </div>

            <button
              onClick={logout}
              className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <nav className="mt-4 flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold ${
                isActive ? "underline" : "opacity-90 hover:underline"
              }`
            }
          >
            Cursos
          </NavLink>

          {isAdminOrDocente && (
            <NavLink
              to="/alumnos"
              className={({ isActive }) =>
                `font-semibold ${
                  isActive ? "underline" : "opacity-90 hover:underline"
                }`
              }
            >
              Alumnos
            </NavLink>
          )}
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
