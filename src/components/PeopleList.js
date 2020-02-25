import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Spinner, Button, Classes as BpClasses } from '@blueprintjs/core';
import { sortItemsByProp } from '../utils/sorting';
import './PeopleList.scss';

const PeopleList = props => {
	const people = Object.values(props.peopleHash);
	const className = classNames(BpClasses.HTML_TABLE, BpClasses.HTML_TABLE_BORDERED, BpClasses.HTML_TABLE_STRIPED, BpClasses.INTERACTIVE, 'people--table');
	const [sorting, setSorting] = React.useState({ name: 1 });
	const renderHeadCell = (propName, label, defaultValue) => {
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

	return (
		<div className="people--container">
			<div className="people--scroll">
				{people.length ? (
					<table className={className}>
						<thead>
							<tr>
								{[
									['name', 'Name', 1],
									['height', 'Height', -1],
									['mass', 'Mass', -1],
								].map(cell => renderHeadCell(...cell))}
							</tr>
						</thead>
						<tbody>
							{sortItemsByProp(people, sorting).map(person => (
								<tr key={person.id}>
									<td>
										<Link to={`/people/${person.id}`}>{person.name}</Link>
									</td>
									<td>{person.height}</td>
									<td>{person.mass}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
};

const { shape } = PropTypes;
PeopleList.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default PeopleList;
