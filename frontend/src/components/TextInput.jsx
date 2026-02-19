import React from "react";

function TextInput({ tag, placeholder, type = "text", onChange, value, required = true }) {
	return (
		<div>
			<span className="font-semibold text-[12px] text-slate-400">{tag}</span>
			<input
				type={type}
				placeholder={placeholder}
				className="input input-md bg-[#0e1627] border-slate-800 shadow-none"
				required={required}
				onChange={onChange}
				defaultValue={value}
			/>
		</div>
	);
}

export default TextInput;
