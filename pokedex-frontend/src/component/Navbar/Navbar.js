import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./Navbar.css";

function Navbar(props) {
	return (
		<header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
			<p className="h5 my-0 me-md-auto fw-normal">
				<Link to="/">
					<p>PokeDEX</p>
				</Link>
			</p>
		</header>
	);
}

export default Navbar;
