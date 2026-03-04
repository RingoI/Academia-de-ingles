import { Facebook, GraduationCap, Instagram, MessageCircle } from "lucide-react";
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
					<h3 className="font-bold text-slate-200">¡Seguinos y escribinos!</h3>

						<div className="flex gap-4">

						{/* FACEBOOK */}
						<a
							href="https://facebook.com/profile.php?id=100063897041979"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#0c1224] p-2 rounded-xl hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
						>
							<Facebook className="size-6 text-white" />
						</a>

						{/* INSTAGRAM */}
						<a
							href="https://www.instagram.com/providence.english.institute"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#0c1224] p-2 rounded-xl hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 transition-all duration-300 hover:scale-110"
						>
							<Instagram className="size-6 text-white" />
						</a>

						{/* WHATSAPP */}
						<a
						href="https://api.whatsapp.com/send?phone=543624820112&text=Hola%20%F0%9F%91%8B%0AVengo%20desde%20la%20web%20y%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20Providence%20Institute"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-[#0c1224] p-2 rounded-xl hover:bg-[#25D366] transition-all duration-300 hover:scale-110"
						>
						<MessageCircle className="size-6 text-white" />
						</a>

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
