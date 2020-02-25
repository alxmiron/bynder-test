import React from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeopleDashboard from './components/PeopleDashboard';
// import PersonPage from './components/PersonPage';
import { fetchAllPeople } from './utils/fetching';
import './App.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const App = () => {
	const [peopleHash, setPeopleHash] = React.useState({});
	React.useEffect(() => {
		fetchAllPeople().then(setPeopleHash);
	}, []);
	return (
		<Router>
			<div className="app--container">
				<Switch>
					{/* <Route path="/people/:id">
						<PersonPage peopleHash={peopleHash} setPeopleHash={setPeopleHash} />
					</Route> */}
					<Route path="/">
						<PeopleDashboard peopleHash={peopleHash} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
