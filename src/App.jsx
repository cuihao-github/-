import React from "react";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import routes from "./routers/index";

function App() {
	return (
		<Router>
			<Redirect exact path="/" to="/index" />
			{routes.map((val, idx) => (
				<Route path={val.path} component={val.component} key={idx} />
			))}
		</Router>
	);
}

export default App;
