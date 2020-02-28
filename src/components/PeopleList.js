import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Spinner, Classes as BpClasses } from '@blueprintjs/core';
import { sortItemsByProp } from '../utils/sorting';
import PeopleListHeadCell from './PeopleListHeadCell';
import './PeopleList.scss';

const PeopleList = props => {
	const people = Object.values(props.peopleHash);
	const className = classNames(BpClasses.HTML_TABLE, BpClasses.HTML_TABLE_BORDERED, BpClasses.HTML_TABLE_STRIPED, BpClasses.INTERACTIVE, 'people--table');
	const [sorting, setSorting] = React.useState({ id: 1 });

	return (
		<div className="people--container">
			<div className="people--scroll">
				{people.length ? (
					<table className={className}>
						<thead>
							<tr>
								<PeopleListHeadCell propName="id" label="ID" defaultValue={1} sorting={sorting} setSorting={setSorting} />
								<PeopleListHeadCell propName="name" label="Name" defaultValue={1} sorting={sorting} setSorting={setSorting} />
								<PeopleListHeadCell propName="height" label="Height" defaultValue={-1} sorting={sorting} setSorting={setSorting} />
								<PeopleListHeadCell propName="mass" label="Mass" defaultValue={-1} sorting={sorting} setSorting={setSorting} />
								<PeopleListHeadCell propName="homeworld" label="Home Planet" defaultValue={1} sorting={sorting} setSorting={setSorting} />
							</tr>
						</thead>
						<tbody>
							{sortItemsByProp(people, sorting).map(person => (
								<tr key={person.id}>
									<td>{person.id}</td>
									<td>
										<Link to={`/people/${person.id}`}>{person.name}</Link>
									</td>
									<td>{person.height}</td>
									<td>{person.mass}</td>
									<td>{props.planetsHash[person.homeworld] ? props.planetsHash[person.homeworld].name : person.homeworld}</td>
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
	planetsHash: shape({}).isRequired,
};

export default PeopleList;
