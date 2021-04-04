import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
// import Home from "./component/Home/Home";
// import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
// import Login from "./component/Login/Login";

const MainRouter = (props) => {
	return (
		<Router>
			<Navbar />
		</Router>
	);
};

export default MainRouter;
