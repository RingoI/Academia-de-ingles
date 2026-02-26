import { Facebook, GraduationCap, Instagram } from "lucide-react";
import React from "react";

function Footer() {
	return (
		<div className="bg-[#0a2540] h-80 px-5 py-20 flex flex-col justify-between">
			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<GraduationCap className="bg-[#1b95d3] size-10 p-1 rounded-lg text-[#0a2540]" />
						<div className="font-semibold italic">
							<span className="text-slate-200 text-lg ">PROVIDENCE </span>
							<span className="text-[#1b95d3] text-lg ">INSTITUTE</span>
						</div>
					</div>
					<p className="text-slate-400">
						Redefiniendo el aprendizaje de idiomas para una <br /> nueva generación de profesionales globales.
					</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<h3 className="font-bold">SIGUENOS</h3>
					<div className="flex gap-5">
						<Facebook className="bg-[#1b95d3] size-10 p-2 rounded-2xl text-[#0a2540]" />
						<Instagram className="bg-[#1b95d3] size-10 p-2 rounded-2xl text-[#0a2540]" />
					</div>
				</div>
			</div>
			<div className="text-slate-500 flex justify-between">
				<span>@ 2026 PROVIDENCE INSTITUTE. Todos los derechos reservados</span>
				<div className="flex gap-4">
					<span>Política de cookies</span>
					<span>Aviso legal</span>
				</div>
			</div>
		</div>
	);
}

export default Footer;
