import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Checkbox, Collapse, Classes as BpClasses } from '@blueprintjs/core';
import './FilterPropControl.scss';

const FilterPropControl = props => {
	const [isOpen, setIsOpen] = React.useState(true);
	const formatTitle = title => {
		const withSpaces = title.replace(/_/g, ' ');
		return `${withSpaces[0].toUpperCase()}${withSpaces.slice(1)}`;
	};
	const setOptionValue = (option, checked) => {
		const newValue = { ...props.checkedOptions, [option]: checked };
		const clearNewValue = Object.keys(newValue).reduce((acc, option) => {
			if (newValue[option]) acc[option] = true;
			return acc;
		}, {});
		return props.setFilterParam(Object.keys(clearNewValue).length ? clearNewValue : null);
	};
	return (
		<div className={classNames('filter--control', isOpen && BpClasses.ACTIVE)}>
			<Button text={formatTitle(props.propName)} onClick={() => setIsOpen(!isOpen)} rightIcon={isOpen ? 'chevron-up' : 'chevron-down'} minimal fill />
			<Collapse isOpen={isOpen}>
				{props.isLoading
					? Array(5)
							.fill(1)
							.map((_, idx) => <Checkbox key={idx} checked={false} label="Some option" className={BpClasses.SKELETON} />)
					: Object.keys(props.options).map(option => (
							<Checkbox key={option} checked={!!props.checkedOptions[option]} label={option} onChange={e => setOptionValue(option, e.target.checked)} />
					  ))}
			</Collapse>
		</div>
	);
};

const { string, shape, bool, func } = PropTypes;
FilterPropControl.propTypes = {
	propName: string.isRequired,
	options: shape({}).isRequired,
	checkedOptions: shape({}).isRequired,
	setFilterParam: func.isRequired,
	isLoading: bool.isRequired,
};

export default FilterPropControl;
