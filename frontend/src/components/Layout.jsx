import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import React from "react";

function Layout() {
	return (
		<div className="flex">
			<Menu />

			<div className="flex-1 p-6 bg-[#020617]">
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
