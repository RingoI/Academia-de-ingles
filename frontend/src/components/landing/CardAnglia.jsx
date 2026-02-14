import { StarIcon } from "lucide-react";
import React from "react";

function CardAnglia({ cambioFondo = false, titulo, descripcion, Icono }) {
	return (
		<div className={`${cambioFondo ? "bg-[#0a2540]" : "bg-slate-100"}  rounded-4xl p-5 w-75 h-55 shadow-black shadow-2xl/15`}>
			<Icono
				className={`${cambioFondo ? "text-[#0a2540] bg-[#1b95d3]" : "text-[#0a2540] bg-[#1b96d33c]"}  size-10 rounded-2xl p-2`}
			/>
			<div className="mt-5">
				<h3 className={`${cambioFondo ? "text-slate-200" : "text-[#0a2540]"} `}>{titulo}</h3>
				<p className={`${cambioFondo ? "text-slate-400" : "text-slate-700"} text-sm mt-3`}>{descripcion}</p>
			</div>
		</div>
	);
}

export default CardAnglia;
