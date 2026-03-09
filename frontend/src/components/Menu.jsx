import {
	Banknote,
	CircleUserIcon,
	LogOut,
	FileText,
	FolderOpen,
	GraduationCap,
	LayoutDashboard,
	LibraryBig,
	Users,
	Bell,
} from "lucide-react";
import ItemMenu from "./ItemMenu";
import { authStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

function Menu() {
	const rol = authStore((state) => state.rol);
	const nombre = authStore((state) => state.nombre);
	const navigate = useNavigate();

	return (
		<div className="bg-[#0b1123] w-60 h-screen relative">
			<div className="text-xl flex flex-row items-center justify-start p-5 gap-4 w-full ">
				<div>
					<GraduationCap className=" bg-[#00b5dd] w-12 h-12 p-2 rounded-xl text-[#030d18] " />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="leading-5 italic text-white">PROVIDENCE </h1>
					<span className="text-[#00b5dd]">INSTITUTE</span>
				</div>
			</div>
			<div className="flex flex-col w-full items-center p-5 gap-3">
				<ItemMenu to={"/dashboard"} Icono={LayoutDashboard} tag={"Dashboard"} />
				{rol === "ROLE_ADMIN" ? <ItemMenu to={"/usuarios"} Icono={Users} tag={"Usuarios"} /> : ""}
				<ItemMenu to={"/cursos"} Icono={LibraryBig} tag={"Cursos"} />
				<ItemMenu to={"/pagos"} Icono={Banknote} tag={"Pagos"} />
				<ItemMenu to={"/avisos"} Icono={Bell} tag={"Avisos"} />
				{rol === "ROLE_DOCENTE" ? <ItemMenu to={"/examenes"} Icono={FolderOpen} tag={"Material"} /> : ""}
			</div>
			<div className="border-t border-slate-800 absolute bottom-0 w-full p-5 flex flex-col gap-4 bg-[#0a0f1f]">
				{/* Usuario */}
				<div className="flex items-center gap-3">
					<div className="bg-slate-800 p-2 rounded-lg">
						<CircleUserIcon className="size-5 text-slate-300" />
					</div>

					<div className="flex flex-col leading-4">
						<span className="text-xs text-slate-400">
							{rol === "ROLE_DOCENTE" ? "Profesor" : rol === "ROLE_ALUMNO" ? "Alumno" : "Administrador"}
						</span>
						<span className="text-sm font-semibold text-slate-400">{nombre || "Admin"}</span>
					</div>
				</div>

				{/* Logout */}
				<button
					onClick={() => {
						authStore.getState().logout();
						navigate("/login");
					}}
					className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition"
				>
					<LogOut className="size-4" />
					Cerrar sesión
				</button>
			</div>
		</div>
	);
}

export default Menu;
