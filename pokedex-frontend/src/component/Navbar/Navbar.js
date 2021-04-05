import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar(props) {
	return (
		<header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-danger border-bottom shadow">
			<p className="h2 my-0 me-md-auto">
				<Link
					to="/"
					className=" fw-bolder text-decoration-none text-white"
				>
					PokeDEX
				</Link>
			</p>
			{props.user ? (
				<>
					<nav className="my-2 my-md-0 me-md-3">
						<NavLink
							exact
							className="btn btn-primary"
							activeStyle={{ color: "yellow" }}
							to="/auth-home"
						>
							PokeDEX
						</NavLink>
					</nav>
					<NavLink
						className="btn btn-primary"
						activeStyle={{ color: "yellow" }}
						to="/my-pokemon"
					>
						My Pokemon
					</NavLink>

					<NavLink
						className="btn btn-primary"
						activeStyle={{ color: "yellow" }}
						to="/profile"
					>
						{props.user.email}
					</NavLink>

					<Link
						className="btn btn-primary"
						to="/login"
						onClick={props.handleUserLogout}
					>
						Logout
					</Link>
				</>
			) : (
				<>
					<nav className="my-2 my-md-0 me-md-3">
						<NavLink
							exact
							className="btn btn-primary"
							activeStyle={{ color: "yellow" }}
							to="/"
						>
							PokeDEX
						</NavLink>
					</nav>
					<NavLink
						className="btn btn-primary"
						activeStyle={{ color: "yellow" }}
						to="/sign-up"
					>
						Sign Up
					</NavLink>
					<NavLink
						className="btn btn-primary"
						activeStyle={{ color: "yellow" }}
						to="/login"
					>
						Login
					</NavLink>
				</>
			)}
		</header>
	);
}

export default Navbar;
