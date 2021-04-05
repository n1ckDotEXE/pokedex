import React from "react";

function NotFound() {
	return (
		<div className="mx-auto">
			<br />
			<img
				src="https://github.com/n1ckDotEXE/pokedex/blob/master/pokedex-frontend/src/component/lib/img/not-found.jpeg?raw=true"
				style={{ width: 200, height: 200 }}
				className="rounded mx-auto d-block"
			></img>
			<br />
			<p className="fw-bold text-center">Sorry, something broke here..</p>
		</div>
	);
}

export default NotFound;
