import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Login from "./component/Login/Login";
import CreateFriend from "./component/CreateFriend/CreateFriend";
import SignUp from "./component/SignUp/SignUp";
import NotFound from "./component/NotFound/NotFound";
import AuthHome from "./component/Home/AuthHome";
import Profile from "./component/Profile/Profile";

const MainRouter = (props) => {
	return (
		<Router>
			<Navbar
				user={props.user}
				handleUserLogout={props.handleUserLogout}
			/>
			<Switch>
				<PrivateRoute
					exact
					path="/my-pokemon"
					component={CreateFriend}
				/>
				<Route
					exact
					path="/login"
					render={(routerProps) => (
						<Login
							{...routerProps}
							handleUserLogin={props.handleUserLogin}
						/>
					)}
				/>{" "}
				<Route exact path="/sign-up" component={SignUp} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/auth-home" component={AuthHome} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/" component={Home} />
				{/* <Route exact path="/my-pokemon" component={CreateFriend} /> */}
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	);
};

export default MainRouter;
