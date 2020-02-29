import React from 'react';
import PropTypes, { func } from 'prop-types';
import { Navbar, Alignment } from '@blueprintjs/core';
import ListControls from './ListControls';
import PeopleList from './PeopleList';
import { getInitFilterParams, filterItemsHash } from '../utils/filtering';
import { fetchAllPeople } from '../utils/fetching';
import { isDev } from '../constants';
import './PeopleDashboard.scss';

const PeopleDashboard = props => {
	React.useEffect(() => {
		// Load data of all people
		fetchAllPeople()
			.then(props.setPeopleHash)
			.catch(console.error);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const filterProps = ['hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
	const [filterParams, setFilterParams] = React.useState(getInitFilterParams(filterProps));

	if (isDev) {
		console.log('filterParams:');
		console.log(filterParams);
	}

	return (
		<>
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Navbar.Heading>Star Wars</Navbar.Heading>
					<Navbar.Divider />
				</Navbar.Group>
			</Navbar>
			<div className="dashboard--layout">
				<ListControls peopleHash={props.peopleHash} filterParams={filterParams} setFilterParams={setFilterParams} />
				<PeopleList peopleHash={filterItemsHash(props.peopleHash, filterParams)} planetsHash={props.planetsHash} />
			</div>
		</>
	);
};

const { shape } = PropTypes;
PeopleDashboard.propTypes = {
	peopleHash: shape({}).isRequired,
	setPeopleHash: func.isRequired,
};

export default PeopleDashboard;
