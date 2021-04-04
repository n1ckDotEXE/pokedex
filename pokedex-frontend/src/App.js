import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import MainRouter from "./MainRouter";
export class App extends Component {
	state = {
		user: null,
	};

	componentDidMount() {
		// Checks local storage for a JWT token named "jwtToken"
		let getJwtToken = localStorage.getItem("jwtToken");

		// If JWT token is found, stays logged in, else logs out
		if (getJwtToken) {
			const currentTime = Date.now() / 1000;

			let decodedJwtToken = jwtDecode(getJwtToken);

			if (decodedJwtToken.exp < currentTime) {
				this.handleUserLogout();
			} else {
				this.handleUserLogin(decodedJwtToken);
			}
		}
	}

	handleUserLogin = (user) => {
		this.setState({
			user: {
				email: user.email,
			},
		});
	};

	handleUserLogout = () => {
		localStorage.removeItem("jwtToken");
		this.setState({
			user: null,
		});
	};

	render() {
		return (
			<>
				<ToastContainer />
				<MainRouter
					user={this.state.user}
					handleUserLogin={this.handleUserLogin}
					handleUserLogout={this.handleUserLogout}
				/>
			</>
		);
	}
}

//only one export default for each file
export default App;
