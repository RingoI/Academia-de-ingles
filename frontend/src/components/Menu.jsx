import { Banknote, FileText, GraduationCap, LayoutDashboard, LibraryBig, Users } from "lucide-react";
import ItemMenu from "./ItemMenu";
function Menu() {
	return (
		<div className="bg-[#0b1123] w-60 h-screen p-5">
			<div className="text-xl flex flex-row items-center justify-start gap-4 w-full ">
				<div>
					<GraduationCap className=" bg-[#00b5dd] w-12 h-12 p-2 rounded-xl text-[#030d18] " />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="leading-5 italic">PROVIDENCE </h1>
					<span className="text-[#00b5dd]">INSTITUTE</span>
				</div>
			</div>
			<div className="flex flex-col w-full items-center mt-8 gap-3">
				<ItemMenu to={"/dashboard"} Icono={LayoutDashboard} tag={"Dashboard"} />
				<ItemMenu to={"/usuarios"} Icono={Users} tag={"Usuarios"} />
				<ItemMenu to={"/cursos"} Icono={LibraryBig} tag={"Cursos"} />
				<ItemMenu to={"/pagos"} Icono={Banknote} tag={"Pagos"} />
				<ItemMenu to={"/examenes"} Icono={FileText} tag={"Exámenes"} />
			</div>
		</div>
	);
}

export default Menu;
