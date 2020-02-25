import React from 'react';
import PropTypes from 'prop-types';
import { collectFilterOptions } from '../utils/filtering';
import FilterPropControl from './FilterPropControl';
import './ListControls.scss';

const ListControls = props => {
	const isLoading = Object.keys(props.peopleHash).length === 0;
	const allOptions = collectFilterOptions(props.peopleHash, props.filterParams);
	const setFilterParamFactory = propName => newValue => props.setFilterParams({ ...props.filterParams, [propName]: newValue });
	return (
		<div className="controls--container">
			<div className="controls--scroll">
				{Object.keys(props.filterParams).map(propName => (
					<FilterPropControl
						key={propName}
						propName={propName}
						options={allOptions[propName] || {}}
						checkedOptions={props.filterParams[propName] || {}}
						setFilterParam={setFilterParamFactory(propName)}
						isLoading={isLoading}
					/>
				))}
			</div>
		</div>
	);
};

const { shape, func } = PropTypes;
ListControls.propTypes = {
	peopleHash: shape({}).isRequired,
	filterParams: shape({}.isRequired),
	setFilterParams: func.isRequired,
};

export default ListControls;
