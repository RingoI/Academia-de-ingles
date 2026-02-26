import React, { useState } from "react";
import TextInput from "./TextInput";
import { UserRoundPlus } from "lucide-react";
import { usuarioStore } from "../store/usuarios.store";

function FormularioAlumnos({ abrirFormularioAlumnos, setAbrirFormularioAlumnos }) {
	const { agregarAlumno } = usuarioStore();
	const [formularioAlumnos, setFormularioAlumnos] = useState({
		nombre: "",
		email: "",
		username: "",
		password: "",
		fechanacimiento: "",
		dni: "",
		direccion: "",
		telefono: "",
		activo: true,
		estado: true,
	});

	function handleSubmit(e) {
		e.preventDefault();
		agregarAlumno(formularioAlumnos);
		setAbrirFormularioAlumnos(!abrirFormularioAlumnos);
	}

	return (
		<div className="bg-[#0f1629] w-160 min-h-100 flex flex-col ">
			<div className="flex items-center gap-3 border border-slate-700 p-3 rounded-t-xl  ">
				<UserRoundPlus className="bg-[#0c354b] text-[#06b6d4] size-10 p-2 rounded-md " />
				<div className="">
					<h1 className="font-semibold text-xl text-white">Nuevo alumno</h1>
					<p className="text-sm text-slate-400">Completa los datos para registrar al nuevo estudiante.</p>
				</div>
			</div>
			<div className="flex">
				<form action="" onSubmit={(e) => handleSubmit(e)}>
					<div className="grid grid-cols-2 p-5 gap-5">
						<TextInput
							tag={"NOMBRE COMPLETO"}
							placeholder={"Ej: Juan Perez"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, nombre: e.target.value })}
						/>
						<TextInput
							tag={"EMAIL"}
							placeholder={"juan.perez@example.com"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, email: e.target.value })}
						/>
						<TextInput
							tag={"USERNAME"}
							placeholder={"jperez_student"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, username: e.target.value })}
						/>
						<TextInput
							tag={"CONTRASEÑA"}
							placeholder={"••••••••"}
							type="password"
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, password: e.target.value })}
						/>
						<TextInput
							tag={"FECHA DE NACIMIENTO"}
							type="date"
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, fechanacimiento: e.target.value })}
						/>
						<TextInput
							tag={"DNI"}
							placeholder={"1234567X"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, dni: e.target.value })}
						/>
						<TextInput
							tag={"DIRECCIÓN"}
							placeholder={"Calle Ejemplo 123"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, direccion: e.target.value })}
						/>
						<TextInput
							tag={"TELÉFONO"}
							placeholder={"+54 9 2477 123456"}
							onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, telefono: e.target.value })}
						/>
					</div>
					<div className="flex items-center justify-end gap-3 border border-slate-700 px-3 py-5 rounded-b-xl  ">
						<button
							className=" px-3 py-1.5 rounded-md text-slate-300 font-semibold cursor-pointer"
							onClick={() => setAbrirFormularioAlumnos(false)}
						>
							Cancelar
						</button>
						<button className="bg-[#06b6d4] shadow-md transition-all duration-300 hover:shadow-cyan-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer">
							Guardar alumno
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormularioAlumnos;
