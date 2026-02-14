function CursoCard({ titulo, descripcion, img, nivel, cambioFondo = false }) {
	return (
		<div className="card  w-92 h-100 rounded-none bg-slate-100 transition-transform duration-500 hover:scale-95">
			<figure className="rounded-t-2xl">
				<img src={img} alt="Shoes" />
			</figure>
			<div className={`card-body ${cambioFondo ? "bg-[#0a2540]" : "bg-white/65"}  rounded-b-2xl`}>
				<span className="text-[#1b95d3] font-semibold text-sm">NIVEL {nivel}</span>
				<h2 className={` ${cambioFondo ? "text-slate-200" : "text-[#0a2540]"} text-xl`}>{titulo}</h2>
				<p className={` ${cambioFondo ? "text-slate-300" : "text-slate-500"}`}>{descripcion}</p>
			</div>
		</div>
	);
}

export default CursoCard;
