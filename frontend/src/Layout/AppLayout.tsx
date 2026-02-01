import { useAuth } from "../Context/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Academia de Inglés</h1>

        <div className="flex items-center gap-4">
          <div className="text-sm text-right">
            <p className="font-semibold">{user?.username}</p>
            <p className="text-indigo-200">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="p-6">{children}</main>
    </div>
  );
}
