import React from 'react';
import { Navbar, Button, FocusStyleManager, Alignment } from '@blueprintjs/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PeopleDashboard from './components/PeopleDashboard';
import { fetchAllPeople } from './utils/fetching';
import './App.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const App = () => {
	const [peopleHash, setPeopleHash] = React.useState({});
	React.useEffect(() => {
		fetchAllPeople().then(setPeopleHash);
	}, []);

	const inRoot = window.location.pathname === '/';
	return (
		<Router>
			<div className="app--container">
				<Navbar>
					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading>Star Wars</Navbar.Heading>
						<Navbar.Divider />
						{!inRoot && (
							<Link to="/">
								<Button minimal text="Home" />
							</Link>
						)}
					</Navbar.Group>
				</Navbar>

				<Switch>
					<Route path="/">
						<PeopleDashboard peopleHash={peopleHash} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
