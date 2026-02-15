import { useState } from "react";
import UsernameInput from "../components/login/UsernameInput";
import PasswordInput from "../components/login/PasswordInput";
import { GraduationCap } from "lucide-react";
import { authStore } from "../store/auth.store";

function LoginPage() {
	const [loginData, setLoginData] = useState({ username: "", password: "" });
	const { login, isLoggingIn } = authStore();

	function handleSubmit(e) {
		console.log("Enviando form");
		e.preventDefault();
		login(loginData);
	}

	console.log("login: ", loginData);

	return (
		<div className="absolute top-0 z-[-2] h-screen w-screen bg-[#030d18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,30,87,0.7),rgba(255,255,255,0))]">
			<div className="w-full gap-5 flex items-center flex-col justify-center h-full">
				<div className="text-3xl flex flex-col items-center gap-2">
					<GraduationCap className="size-15 bg-[#00b5dd] p-2 rounded-2xl text-[#030d18] " />
					<h1 className="italic">
						PROVIDENCE <span className="text-[#00b5dd]">INSTITUTE</span>
					</h1>
					<span className="text-sm tracking-[0.4rem] text-slate-500">PLATAFORMA INSTITUCIONAL</span>
				</div>
				<div className="h-100 bg-[##0b1423] w-100 rounded-4xl p-8 border border-slate-800 justify-center shadow-xl shadow-blue-400/10">
					<div>
						<h3 className="font-semibold text-xl">Acceso Institucional</h3>
						<p className="text-sm text-slate-400">Ingresa sus credenciales para acceder a la plataforma</p>
					</div>
					<div className="h-70 justify-between flex w-full items-center pt-7 flex-col">
						<form onSubmit={(e) => handleSubmit(e)} className="w-full h-full flex justify-between items-center flex-col ">
							<div className="w-full flex  flex-col gap-5">
								<div className="flex gap-1 flex-col w-full">
									<span className="text-[#00b5dd] tracking-widest font-semibold text-sm">USUARIO INSTITUCIONAL</span>
									<UsernameInput onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
								</div>
								<div className="flex w-full gap-1 flex-col">
									<span className="text-[#00b5dd] tracking-widest font-semibold text-sm">CONTRASEÑA</span>
									<PasswordInput onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
								</div>
							</div>
							<div className="w-full">
								<button
									type="submit"
									className="bg-[#00b5ddb8] cursor-pointer font-semibold  transition-transform hover:translate-y-1 text-[#030d18] w-full h-12 rounded-2xl"
								>
									{isLoggingIn ? <span className="loading loading-spinner loading-sm"></span> : "Iniciar Sesion"}
								</button>
							</div>
						</form>
					</div>
				</div>
				<p className="text-center text-slate-600 text-[10px]">
					@2026 Providence Institute. Todos los derechos reservados. <br /> PPyL Proyecto Universitario{" "}
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
