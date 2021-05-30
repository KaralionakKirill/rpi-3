import React, { Suspense } from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Home from "./components/Home";
import Architects from "./components/Architects";

const Loader = () => (
	<div>
        Loading...
	</div>
);

export default function App() {
  return (
		<Suspense fallback={<Loader/>}>
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/architects/:id?" component={Architects} />
				</Switch>
			</Router>
		</Suspense>
	);
}
