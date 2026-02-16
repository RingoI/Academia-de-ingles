import { NavLink } from "react-router-dom";

function ItemMenu({ to, Icono, tag }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex gap-1.5 w-full text-[15px] font-semibold border-[#0b1123] py-2 bg-linear-to-r border-l-3 pl-4 hover:border-[#06b6d4] hover:from-cyan-300/10  ${isActive ? "text-[#06b6d4]   from-cyan-300/10  border-[#06b6d4]" : "text-[#94a3b8]"}`
			}
		>
			<Icono />
			<span>{tag}</span>
		</NavLink>
	);
}

export default ItemMenu;
