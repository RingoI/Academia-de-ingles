function RolesOpciones({ Icono, text, onClick, activo }) {
	console.log("activo: ", activo);

	return (
		<div
			className={`cursor-pointer w-24 h-16 flex flex-col gap-1 items-center justify-center rounded-xl p-1 border
        ${activo ? "bg-[#0a2739] border-[#05637e]" : "bg-[#08111d] border-slate-800"}`}
			onClick={onClick}
		>
			<Icono className={activo ? "text-[#00d4ff]" : "text-slate-400"} />
			<span className={`font-semibold text-[13px] ${activo ? "text-[#00d4ff]" : "text-slate-400"}`}>{text}</span>
		</div>
	);
}

export default RolesOpciones;
