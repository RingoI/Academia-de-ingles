import { Bell, Calendar, GraduationCap, School } from "lucide-react";
import React from "react";

function AvisoCard({ aviso = [] }) {
	const fechaString = aviso?.fechaCreacion;
	const fecha = new Date(fechaString);

	const fechaCompleta = fecha.toLocaleDateString();
	const hora = fecha.toLocaleTimeString("es-AR", {
		hour: "2-digit",
		minute: "2-digit",
	});

	const hoy = new Date().toLocaleDateString();

	return (
		<div className="bg-[#0b1524] h-52 rounded-xl flex flex-col relative overflow-hidden hover:scale-101 transition-all duration-200">
			<Bell className="text-slate-400/15 absolute size-60 right-0 bottom-0  rotate-12 z-0 " />
			<span className="absolute right-0 mr-5 mt-5 font-bold px-2 rounded-lg text-slate-100 bg-[#06b6d4]">
				{fechaCompleta === hoy ? "NUEVO" : ""}
			</span>
			<div className="flex p-5 gap-2">
				<div className="w-10">
					{aviso.institucional ? (
						<School className="bg-[#272626] p-2 size-10 rounded-lg mt-1.5 text-[#ad7412]" />
					) : (
						<GraduationCap className="bg-[#0f273d] p-2 size-10 rounded-lg mt-1.5 text-[#0ea1e3]" />
					)}
				</div>

				<div className="flex flex-col justify-between h-42 ">
					<div className=" flex flex-col gap-1.5 ">
						<span className="font-semibold text-xl">{aviso.titulo}</span>
						<span className="text-slate-400 font-semibold text-sm">
							Dirigido a: {aviso.institucional ? "Toda la institución" : `Estudiantes de ${aviso.nombreCurso}`}
						</span>
						<p className="text-slate-300 font-normal">{aviso.cuerpo}</p>
					</div>
					<div className="flex items-center gap-1">
						<Calendar className="size-4 text-slate-500" />
						<div className="font-semibold text-slate-500">
							<span>Publicado el: </span>
							<span>{fechaCompleta} a las </span>
							<span>{hora}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AvisoCard;
