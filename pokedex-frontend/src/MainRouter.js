import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";

const MainRouter = (props) => {
	return (
		<Router>
			<Navbar />
		</Router>
	);
};

export default MainRouter;
