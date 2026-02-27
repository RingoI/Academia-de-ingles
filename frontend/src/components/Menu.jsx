import { Banknote, CircleUserIcon, FileText, FolderOpen, GraduationCap, LayoutDashboard, LibraryBig, Users } from "lucide-react";
import ItemMenu from "./ItemMenu";
import { authStore } from "../store/auth.store";
function Menu() {
	const { rol, nombre } = authStore();

	return (
		<div className="bg-[#0b1123] w-60 h-screen relative">
			<div className="text-xl flex flex-row items-center justify-start p-5 gap-4 w-full ">
				<div>
					<GraduationCap className=" bg-[#00b5dd] w-12 h-12 p-2 rounded-xl text-[#030d18] " />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="leading-5 italic">PROVIDENCE </h1>
					<span className="text-[#00b5dd]">INSTITUTE</span>
				</div>
			</div>
			<div className="flex flex-col w-full items-center p-5 gap-3">
				<ItemMenu to={"/dashboard"} Icono={LayoutDashboard} tag={"Dashboard"} />
				{rol === "ROLE_ADMIN" ? <ItemMenu to={"/usuarios"} Icono={Users} tag={"Usuarios"} /> : ""}
				<ItemMenu to={"/cursos"} Icono={LibraryBig} tag={"Cursos"} />
				<ItemMenu to={"/pagos"} Icono={Banknote} tag={"Pagos"} />
				{rol === "ROLE_DOCENTE" ? <ItemMenu to={"/examenes"} Icono={FolderOpen} tag={"Material"} /> : ""}
			</div>
			<div className="border-t border-slate-800 px-6 absolute bottom-0 w-full h-20 gap-2 flex  items-center">
				<CircleUserIcon className="size-7" />
				<div className="flex flex-col leading-4 ">
					<span className="">{rol === "ROLE_DOCENTE" ? "Prof." : rol === "ROLE_ALUMNO" ? "Alumno" : "ADMIN"}</span>
					<span className="font-semibold">{nombre || "Admin"}</span>
				</div>
			</div>
		</div>
	);
}

export default Menu;
