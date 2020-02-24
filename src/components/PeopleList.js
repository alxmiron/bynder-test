import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, AnchorButton } from '@blueprintjs/core';
import './PeopleList.scss';

const PeopleList = props => {
	const people = Object.values(props.peopleHash);
	return (
		<ul className="people--list">
			{people.length ? (
				people.map(person => (
					<li key={person.id}>
						<AnchorButton href={`/people/${person.id}`} text={person.name} icon="user" minimal fill />
					</li>
				))
			) : (
				<Spinner />
			)}
		</ul>
	);
};

const { shape } = PropTypes;
PeopleList.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default PeopleList;
