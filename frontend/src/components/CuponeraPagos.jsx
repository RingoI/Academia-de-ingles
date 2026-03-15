import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CuponeraPagos({ items = [] }) {
	const [abrir, setAbrir] = useState(false);

	function handleRedirect(e) {
		e.preventDefault();
		alert("Vas a ser redirigido a Mercado Pago. Guarda tus comprobantes en caso de que el pago se apruebe.");
		window.location.href = e.currentTarget.href;
	}

	return (
		<div className="bg-[#0b1524] rounded-xl">
			<h3
				className="font-black text-2xl h-20 px-5 flex items-center cursor-pointer justify-between"
				onClick={() => setAbrir(!abrir)}
			>
				Curso: {items[0]?.nombreCurso}
				{abrir ? <ChevronUp /> : <ChevronDown />}
			</h3>
			<div className={`${abrir ? "flex" : "hidden"} flex-col gap-3 px-5 pb-5`}>
				{items.map((cup, idx) => (
					<div key={idx} className="bg-[#020617] h-24 flex items-center justify-between px-5 rounded-2xl">
						<span className="font-semibold text-xl">Cuota: {cup.numeroCuota}</span>
						<span className="bg-[#00b5dd51] rounded-xl py-1.5 font-bold px-2">Monto: ${cup.monto}</span>
						{cup.status === "pending" ? (
							<span className="bg-[#272626] text-[#ad7412] font-semibold px-4 py-1.5 rounded-2xl">PENDIENTE</span>
						) : (
							<span className="bg-green-500/30 font-semibold px-4 py-1.5 rounded-2xl text-green-500">APROBADO</span>
						)}
						<a
							href={cup.initPoint}
							target="_blank"
							className={`${cup.status === "pending" ? "" : "pointer-events-none cursor-default"}`}
							onClick={(e) => handleRedirect(e)}
						>
							<button
								className={`${cup.status === "pending" ? "bg-[#ffe700]" : "bg-[#ffe700]/20 cursor-none"}  bg-[#ffe700] h-10 w-40 gap-2 rounded-2xl text-slate-800 font-bold flex items-center justify-center cursor-pointer`}
							>
								<img src="mercado-pago-icon.png" alt="" className="w-9" />
								PAGAR
							</button>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}

export default CuponeraPagos;
