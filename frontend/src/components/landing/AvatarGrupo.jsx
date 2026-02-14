import React from "react";

function AvatarGrupo() {
	return (
		<div className="avatar-group relative -space-x-6">
			<div className="avatar">
				<div className="w-8">
					<img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
				</div>
			</div>
			<div className="avatar">
				<div className="w-8">
					<img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
				</div>
			</div>
			<div className="avatar">
				<div className="w-8">
					<img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
				</div>
			</div>
			<div className="avatar avatar-placeholder">
				<div className="bg-neutral text-neutral-content w-8">
					<span>+80</span>
				</div>
			</div>
		</div>
	);
}

export default AvatarGrupo;
