import { useState } from "react";
import { usuarioStore } from "../store/usuarios.store";
import { UserRoundPlus } from "lucide-react";
import TextInput from "./TextInput";

function FormularioDocentes({ abrirFormularioDocentes, setAbrirFormularioDocentes, values = {} }) {
	const { agregarDocente, modificarDocente } = usuarioStore();
	const [formularioDocentes, setFormularioDocentes] = useState({
		nombre: values.nombre || "",
		titulo: values.titulo || "",
		email: values.email || "",
		username: values.username || "",
		password: "",
		fechanacimiento: values.fechanacimiento || "",
		cuit: values.cuit || "",
		direccion: values.direccion || "",
		telefono: "",
		activo: true,
		estado: true,
	});

	function handleSubmit(e) {
		e.preventDefault();

		const data = { ...formularioDocentes };
		if (values.id && !data.password) {
			delete data.password;
		}
		if (!values.id) {
			agregarDocente(formularioDocentes);
		} else {
			modificarDocente(values.id, formularioDocentes);
		}
		setAbrirFormularioDocentes(!abrirFormularioDocentes);
	}

	return (
		<div className="bg-[#0f1629] w-160 min-h-100 flex flex-col ">
			<div className="flex items-center gap-3 border border-slate-700 p-3 rounded-t-xl  ">
				<UserRoundPlus className="bg-[#818df841] text-[#818cf8] size-10 p-2 rounded-md " />
				<div className="">
					<h1 className="font-semibold text-xl">{values.id ? "Modificar Docente" : "Nuevo Docente"}</h1>
					<p className="text-sm text-slate-400">Completa los datos para registrar al nuevo docente.</p>
				</div>
			</div>
			<div className="flex">
				<form action="" onSubmit={(e) => handleSubmit(e)}>
					<div className="grid grid-cols-2 p-5 gap-5">
						<TextInput
							tag={"NOMBRE COMPLETO"}
							placeholder={"Ej: Juan Perez"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, nombre: e.target.value })}
							value={formularioDocentes.nombre}
						/>
						<TextInput
							tag={"TITULO"}
							placeholder={"Ej: C2"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, titulo: e.target.value })}
							value={formularioDocentes.titulo}
						/>
						<TextInput
							tag={"EMAIL"}
							placeholder={"juan.perez@example.com"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, email: e.target.value })}
							value={formularioDocentes.email}
						/>
						<TextInput
							tag={"USERNAME"}
							placeholder={"jperez_student"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, username: e.target.value })}
							value={formularioDocentes.username}
						/>
						<TextInput
							tag={"CONTRASEÑA"}
							placeholder={"••••••••"}
							type="password"
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, password: e.target.value })}
							value={formularioDocentes.password}
							required={!values.id}
						/>
						<TextInput
							tag={"FECHA DE NACIMIENTO"}
							type="date"
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, fechanacimiento: e.target.value })}
							value={formularioDocentes.fechanacimiento}
						/>
						<TextInput
							tag={"CUIT"}
							placeholder={"23-1234567X-9"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, cuit: e.target.value })}
							value={formularioDocentes.cuit}
						/>
						<TextInput
							tag={"DIRECCIÓN"}
							placeholder={"Calle Ejemplo 123"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, direccion: e.target.value })}
							value={formularioDocentes.direccion}
						/>
						<TextInput
							tag={"TELÉFONO"}
							placeholder={"+54 9 2477 123456"}
							onChange={(e) => setFormularioDocentes({ ...formularioDocentes, telefono: e.target.value })}
							value={formularioDocentes.telefono}
							required={!values.id}
						/>
					</div>
					<div className="flex items-center justify-end gap-3 border border-slate-700 px-3 py-5 rounded-b-xl  ">
						<button
							className=" px-3 py-1.5 rounded-md text-slate-300 font-semibold cursor-pointer"
							onClick={() => setAbrirFormularioDocentes(false)}
						>
							Cancelar
						</button>
						<button className="bg-[#818cf8] shadow-md transition-all duration-300 hover:shadow-indigo-500/50 px-3 py-1.5 rounded-lg font-semibold text-[#0c1224] text-sm cursor-pointer">
							Guardar Docente
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormularioDocentes;
