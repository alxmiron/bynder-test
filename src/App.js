import React from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeopleDashboard from './components/PeopleDashboard';
import PersonPage from './components/PersonPage';
import { isDev } from './constants';
import './App.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const App = () => {
	const [peopleHash, setPeopleHash] = React.useState({});
	const savePersonInHash = person => setPeopleHash({ ...peopleHash, [person.id]: person });
	const savePersonsInHash = persons => setPeopleHash({ ...peopleHash, ...persons });

	const [planetsHash, setPlanetsHash] = React.useState({});
	const savePlanetInHash = planet => setPlanetsHash({ ...planetsHash, [planet.id]: planet });

	if (isDev) {
		console.log('----');
		console.log('Current peopleHash:');
		console.log(peopleHash);
		console.log('Current planetsHash:');
		console.log(planetsHash);
		console.log('----');
	}
	return (
		<Router>
			<div className="app--container">
				<Switch>
					<Route path="/people/:id">
						<PersonPage
							peopleHash={peopleHash}
							savePersonInHash={savePersonInHash}
							savePersonsInHash={savePersonsInHash}
							planetsHash={planetsHash}
							savePlanetInHash={savePlanetInHash}
						/>
					</Route>
					<Route path="/">
						<PeopleDashboard peopleHash={peopleHash} setPeopleHash={setPeopleHash} planetsHash={planetsHash} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
