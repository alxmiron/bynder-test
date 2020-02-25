import React from 'react';
import PropTypes from 'prop-types';
import ListControls from './ListControls';
import PeopleList from './PeopleList';
import { getInitFilterParams, filterItemsHash } from '../utils/filtering';
import { isDev } from '../constants';
import './PeopleDashboard.scss';

const PeopleDashboard = props => {
	const filterProps = ['hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
	const [filterParams, setFilterParams] = React.useState(getInitFilterParams(filterProps));
	if (isDev) console.log('filterParams:', filterParams);
	return (
		<div className="dashboard--layout">
			<ListControls peopleHash={props.peopleHash} filterParams={filterParams} setFilterParams={setFilterParams} />
			<PeopleList peopleHash={filterItemsHash(props.peopleHash, filterParams)} />
		</div>
	);
};

const { shape } = PropTypes;
PeopleDashboard.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default PeopleDashboard;
