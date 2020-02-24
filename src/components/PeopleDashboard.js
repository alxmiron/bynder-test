import React from 'react';
import PropTypes from 'prop-types';
import ListControls from './ListControls';
import PeopleList from './PeopleList';
import './PeopleDashboard.scss';

const PeopleDashboard = props => {
	return (
		<div className="dashboard--layout">
			<ListControls peopleHash={props.peopleHash} />
			<PeopleList peopleHash={props.peopleHash} />
		</div>
	);
};

const { shape } = PropTypes;
PeopleDashboard.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default PeopleDashboard;
