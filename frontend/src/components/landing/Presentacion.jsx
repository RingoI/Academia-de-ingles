import AvatarGrupo from "./AvatarGrupo";

function Presentacion() {
	return (
		<div className="bg-[#030d18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,30,87,0.7),rgba(255,255,255,0))] w-full h-screen flex pt-18 items-center px-10">
			<div className="flex flex-col gap-5 w-[50%]">
				<div>
					<span className="px-4 py-1.5 rounded-2xl text-[#00d3fe] font-semibold bg-[#163855]">
						EL FUTURO DE LA EDUCACIÓN BILINGÜE
					</span>
				</div>
				<div>
					<h1 className="text-6xl text-6xl text-white">Master your future</h1>
					<h1 className="text-6xl text-[#1b95d3] italic">through English.</h1>
				</div>
				<p className="text-slate-400">
					Providence Institute no solo es un instituto. Es una plataforma de <br /> alto rendimiento diseñada para profesionales y
					mentes <br /> ambiciosas que buscan dominio real del idioma
				</p>
				<div className="flex items-center gap-4 w-80 h-12 px-3 bg-[#163855] rounded-3xl">
					<AvatarGrupo />
					<span className="font-semibold text-slate-300">+80 Alumnos Activos</span>
				</div>
			</div>
			<div className="w-[50%]">
				<img src="providence.webp" className="rounded-4xl h-120 shadow-xl/10 shadow-white rotate-7 opacity-80" />
			</div>
		</div>
	);
}

export default Presentacion;
