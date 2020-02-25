import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Button, Alignment, Classes as BpClasses, Card, Elevation, Tag } from '@blueprintjs/core';
import { fetchPerson } from '../utils/fetching';
import './PersonPage.scss';

const PersonPage = props => {
	const { id: personId } = useParams();
	console.log('personId', personId);
	const [person, setPerson] = React.useState(props.peopleHash[personId] || {});
	React.useEffect(() => {
		fetchPerson(personId).then(personData => {
			setPerson(personData);
		});
	}, [personId]);

	return (
		<>
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Navbar.Heading>Star Wars</Navbar.Heading>
					<Navbar.Divider />

					<Link to="/">
						<Button minimal text="Home" />
					</Link>
				</Navbar.Group>
			</Navbar>
			<div className="person--container">
				<Card elevation={Elevation.ONE} className="person--card">
					<h4 className={classNames(BpClasses.HEADING, !person.name && BpClasses.SKELETON)}>{person.name || 'Some name'}</h4>
					<p>
						{['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'].map(propName => (
							<Tag key={propName} className={person[propName] ? '' : BpClasses.SKELETON} large minimal>{`${propName}: ${person[propName]}`}</Tag>
						))}
					</p>
				</Card>
			</div>
		</>
	);
};

const { shape } = PropTypes;
PersonPage.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default PersonPage;
