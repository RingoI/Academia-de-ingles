function Card({ titulo, texto, Icono, fondo = false }) {
	return (
		<div className={`${fondo ? "bg-[#0a2540]" : "bg-slate-50 "} min-h-60 w-100 rounded-3xl p-5 border border-slate-200`}>
			<div className="flex gap-3 items-center">
				<Icono className={`${fondo ? "bg-[#1b95d3] text-[#0a2540]" : "bg-[#0a2540] text-[#1b95d3]"}  size-10 p-1 rounded-xl `} />
				<h1 className={`${fondo ? "text-slate-200" : "text-[#0a2540] "} text-xl font-semibold`}>{titulo}</h1>
			</div>
			<p className={`${fondo ? "text-slate-50" : "text-slate-500"}  mt-5`}>{texto}</p>
		</div>
	);
}

export default Card;
