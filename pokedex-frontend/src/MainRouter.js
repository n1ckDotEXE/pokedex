import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Login from "./component/Login/Login";
import MyPokemon from "./component/MyPokemon/MyPokemon";
import SignUp from "./component/SignUp/SignUp";
import NotFound from "./component/NotFound/NotFound";

const MainRouter = (props) => {
	return (
		<Router>
			<Navbar
				user={props.user}
				handleUserLogout={props.handleUserLogout}
			/>
			<Switch>
				<PrivateRoute exact path="/my-pokemon" component={MyPokemon} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/sign-up" component={SignUp} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/" component={Home} />
				<Route exact path="/my-pokemon" component={MyPokemon} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	);
};

export default MainRouter;
