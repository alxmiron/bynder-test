import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Alignment, Classes as BpClasses, Card, Elevation, Tag } from '@blueprintjs/core';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';
import { fetchPerson, fetchPlanet } from '../utils/fetching';
import './PersonPage.scss';

const PersonPage = props => {
	const { id: personId } = useParams();
	const localPerson = props.peopleHash[personId];
	const person = localPerson || {};

	React.useEffect(() => {
		const personFromHash = props.peopleHash[personId];
		const fetchPersonData = () => (personFromHash ? Promise.resolve(personFromHash) : fetchPerson(personId));
		fetchPersonData().then(personData => {
			if (!personFromHash) props.savePersonInHash(personData);
			if (personData.homeName && personData.neighbours) return; // Planet data is loaded already
			fetchPlanet(personData.homeworld).then(planet => {
				const extendedPersonData = { ...personData, homeName: planet.name, neighbours: planet.residents };
				props.savePersonInHash(extendedPersonData);
			});
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
					<h3 className={classNames(BpClasses.HEADING, !person.name && BpClasses.SKELETON)}>{person.name || 'Some name'}</h3>
					<p>
						{['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'].map(propName => {
							const value = person[propName];
							if (person.id && !value) return null;
							return <Tag key={propName} className={value ? '' : BpClasses.SKELETON} large minimal>{`${propName}: ${value}`}</Tag>;
						})}
					</p>

					<h4 className={classNames(!person.homeName && BpClasses.SKELETON)}>
						{person.name} is from {person.homeName} planet. See other people from this planet:
					</h4>
					<ButtonGroup minimal>
						{(person.neighbours || [])
							.reduce((acc, residentId, idx, arr) => {
								// Skip current person
								if (residentId == personId) return acc; // eslint-disable-line eqeqeq
								acc.push(residentId);
								if (idx !== arr.length - 1) acc.push(-1); // Add separators
								return acc;
							}, [])
							.map((residentId, idx) => {
								if (residentId === -1) return <Divider key={idx} />; // Add separators
								const name = props.peopleHash[residentId] ? props.peopleHash[residentId].name : residentId;
								return (
									<Link key={idx} to={`/people/${residentId}`}>
										<Button minimal text={name} />
									</Link>
								);
							})}
					</ButtonGroup>
				</Card>
			</div>
		</>
	);
};

const { shape, func } = PropTypes;
PersonPage.propTypes = {
	peopleHash: shape({}).isRequired,
	savePersonInHash: func.isRequired,
};

export default PersonPage;
