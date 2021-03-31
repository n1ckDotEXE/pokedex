import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import MainRouter from "./MainRouter";
export class App extends Component {
	render() {
		return (
			<>
				<ToastContainer />
				<MainRouter />
			</>
		);
	}
}

//only one export default for each file
export default App;
