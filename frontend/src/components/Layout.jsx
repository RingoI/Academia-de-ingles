import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import React from "react";

function Layout() {
	return (
		<div className="flex h-screen">
			<aside className="w-60 h-screen">
				<Menu />
			</aside>

			<main className="flex-1 overflow-y-auto p-6 bg-[#020617]">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
