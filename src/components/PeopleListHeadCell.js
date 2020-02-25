import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Classes as BpClasses } from '@blueprintjs/core';

const PeopleListHeadCell = props => {
	const { propName, label, defaultValue, sorting, setSorting } = props;
	const isActive = sorting[propName] !== undefined;
	return (
		<th key={propName} className={classNames(isActive && BpClasses.ACTIVE)} onClick={isActive ? null : () => setSorting({ [propName]: defaultValue })}>
			<span>{label}</span>
			{sorting[propName] !== undefined && (
				<Button icon={sorting[propName] === 1 ? 'arrow-up' : 'arrow-down'} onClick={() => setSorting({ [propName]: -sorting[propName] })} minimal />
			)}
		</th>
	);
};

const { string, shape, number, func } = PropTypes;
PeopleListHeadCell.propTypes = {
	propName: string.isRequired,
	label: string.isRequired,
	defaultValue: number.isRequired,
	sorting: shape({}).isRequired,
	setSorting: func.isRequired,
};

export default PeopleListHeadCell;
