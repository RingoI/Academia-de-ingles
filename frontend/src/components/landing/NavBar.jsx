import { GraduationCap } from "lucide-react";

function NavBar() {
	return (
		<div className="w-full h-18 bg-slate-300 flex items-center justify-between px-5 fixed top-0 z-20">
			<div className="flex items-center gap-2">
				<GraduationCap className="bg-[#0a2540] size-10 p-1 rounded-lg text-[#1b95d3]" />
				<div className="font-semibold">
					<span className="text-[#0a2540] text-lg ">PROVIDENCE</span>
					<span className="text-[#1b95d3] text-lg ">INSTITUTE</span>
				</div>
			</div>
			<div>
				<ul className="w-[33.3%] flex gap-10 font-semibold text-slate-500">
					<li className="cursor-pointer">Inicio</li>
					<li className="cursor-pointer">Cursos</li>
					<li className="cursor-pointer">Nosotros</li>
					<li className="cursor-pointer">Contacto</li>
				</ul>
			</div>
			<div>
				<button className="bg-[#0a2540] px-5 rounded-3xl font-semibold py-1.5 cursor-pointer transition-transform hover:scale-105">
					Ingresar a Plataforma
				</button>
			</div>
		</div>
	);
}

export default NavBar;
