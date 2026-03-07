import React, { useState } from "react";
import TextInput from "./TextInput";
import { UserRoundPlus, X } from "lucide-react";
import { usuarioStore } from "../store/usuarios.store";

function FormularioAlumnos({ abrirFormularioAlumnos, setAbrirFormularioAlumnos, values = {} }) {
    const { agregarAlumno, modificarAlumno } = usuarioStore();
    
    // Inicializamos el estado con los valores que vienen por props (si es edición)
    const [formularioAlumnos, setFormularioAlumnos] = useState({
        nombre: values.nombre || "",
        email: values.email || "",
        username: values.username || "",
        password: "",
        fechanacimiento: values.fechanacimiento || "",
        dni: values.dni || "",
        direccion: values.direccion || "",
        telefono: values.telefono || "",
        activo: values.activo !== undefined ? values.activo : true,
        estado: values.estado !== undefined ? values.estado : true,
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Clonamos el estado para manipularlo antes de enviar
        const data = { ...formularioAlumnos };

        // Si estamos editando y no se escribió una nueva contraseña, la eliminamos del objeto
        if (values.id && !data.password) {
            delete data.password;
        }

        if (!values.id) {
            agregarAlumno(data); // Usamos 'data' procesado
        } else {
            modificarAlumno(values.id, data); // Usamos 'data' procesado
        }

        // Cerramos el modal
        setAbrirFormularioAlumnos(false);
    }

    return (
        <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-700 p-5 bg-slate-900/50">
                <div className="flex items-center gap-4">
                    <UserRoundPlus className="bg-[#0c354b] text-[#06b6d4] size-12 p-2.5 rounded-xl" />
                    <div>
                        <h1 className="font-bold text-xl text-white">
                            {values.id ? "Modificar Alumno" : "Nuevo Alumno"}
                        </h1>
                        <p className="text-sm text-slate-400">
                            {values.id ? "Edita los datos del estudiante seleccionado." : "Completa los datos para registrar al nuevo estudiante."}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setAbrirFormularioAlumnos(false)}
                    className="text-slate-500 hover:text-white transition-colors p-2"
                >
                    <X size={24} />
                </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
                    <TextInput
                        tag={"NOMBRE COMPLETO"}
                        placeholder={"Ej: Juan Perez"}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, nombre: e.target.value })}
                        value={formularioAlumnos.nombre}
                        required
                    />
                    <TextInput
                        tag={"EMAIL"}
                        placeholder={"juan.perez@example.com"}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, email: e.target.value })}
                        value={formularioAlumnos.email}
                        required
                    />
                    <TextInput
                        tag={"USERNAME"}
                        placeholder={"jperez_student"}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, username: e.target.value })}
                        value={formularioAlumnos.username}
                        required
                    />
                    <TextInput
                        tag={"CONTRASEÑA"}
                        placeholder={values.id ? "Dejar en blanco para no cambiar" : "••••••••"}
                        type="password"
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, password: e.target.value })}
                        value={formularioAlumnos.password}
                        required={!values.id} // Obligatoria solo si es nuevo
                    />
                    <TextInput
                        tag={"FECHA DE NACIMIENTO"}
                        type="date"
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, fechanacimiento: e.target.value })}
                        value={formularioAlumnos.fechanacimiento}
                        required
                    />
                    <TextInput
                        tag={"DNI"}
                        placeholder={"12345678"}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, dni: e.target.value })}
                        value={formularioAlumnos.dni}
                        required
                    />
                    <TextInput
                        tag={"DIRECCIÓN"}
                        placeholder={"Calle Ejemplo 123"}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, direccion: e.target.value })}
                        value={formularioAlumnos.direccion}
                    />
                    <TextInput
                        tag={"TELÉFONO"}
                        placeholder={"+54 9 2352 ..."}
                        onChange={(e) => setFormularioAlumnos({ ...formularioAlumnos, telefono: e.target.value })}
                        value={formularioAlumnos.telefono}
                    />
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-700 px-6 py-5 bg-slate-900/30">
                    <button
                        className="px-5 py-2 rounded-lg text-slate-400 font-semibold hover:text-white transition-colors cursor-pointer"
                        onClick={() => setAbrirFormularioAlumnos(false)}
                        type="button"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit"
                        className="bg-[#06b6d4] shadow-lg shadow-cyan-500/20 hover:bg-[#0891b2] px-6 py-2 rounded-lg font-bold text-[#0c1224] transition-all active:scale-95 cursor-pointer"
                    >
                        {values.id ? "Actualizar datos" : "Guardar alumno"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioAlumnos;