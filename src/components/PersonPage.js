import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Alignment, Classes as BpClasses, Card, Elevation, Tag } from '@blueprintjs/core';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';
import { fetchPerson, fetchPeople, fetchPlanet } from '../utils/fetching';
import './PersonPage.scss';

const PersonPage = props => {
	const { id: personId } = useParams();
	const localPerson = props.peopleHash[personId];
	const planetId = localPerson && localPerson.homeworld;
	const localPlanet = localPerson && props.planetsHash[planetId];

	React.useEffect(() => {
		if (!localPerson) {
			fetchPerson(personId).then(props.savePersonInHash);
		}
	}, [personId]);

	React.useEffect(() => {
		if (!planetId) return;
		if (!localPlanet) {
			fetchPlanet(planetId).then(props.savePlanetInHash);
		}
	}, [planetId]);

	const person = localPerson || {};
	const planet = localPlanet || {};

	const otherResidents = (planet.residents || []).filter(residentId => residentId != personId); // eslint-disable-line eqeqeq
	React.useEffect(() => {
		const unknownResidents = otherResidents.filter(residentId => !props.peopleHash[residentId]);
		if (!unknownResidents.length) return;
		fetchPeople(unknownResidents).then(props.savePersonsInHash);
	}, [personId, planet.residents]);
	return (
		<>
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Navbar.Heading>Star Wars</Navbar.Heading>
					<Navbar.Divider />

					<Link to="/">
						<Button icon="chevron-left" minimal text="Back to list" />
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

					<h4 className={classNames(!planet.name && BpClasses.SKELETON)}>
						{person.name} is from {planet.name} planet. See other people from this planet:
					</h4>
					<ButtonGroup minimal>
						{otherResidents
							.reduce((acc, residentId, idx, arr) => {
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
	savePersonsInHash: func.isRequired,
	planetsHash: shape({}).isRequired,
	savePlanetInHash: func.isRequired,
};

export default PersonPage;
