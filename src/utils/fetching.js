import { ApiHost, isDev } from '../constants';
import { formatNumericObjectProps } from './helpers';

const getIdFromURL = url => {
	const match = url.match(/(\d+)\/?$/);
	return parseInt(match[1], 10);
};

const formatFetchedPerson = personData => {
	personData.id = getIdFromURL(personData.url);
	personData.homeworld = getIdFromURL(personData.homeworld);
	return formatNumericObjectProps(personData, ['height', 'mass']);
};

export const fetchPerson = personId => {
	return fetch(`${ApiHost}/people/${personId}/`)
		.then(res => res.json())
		.catch(error => {
			console.error(error);
			return {};
		})
		.then(personData => {
			const person = formatFetchedPerson(personData);
			if (isDev) {
				console.log('Fetched person:');
				console.log(person);
			}
			return person;
		});
};

export const fetchPeople = personIdList => {
	return Promise.all(personIdList.map(fetchPerson)).then(results => {
		return results.reduce((acc, person) => {
			acc[person.id] = person;
			return acc;
		}, {});
	});
};

export const fetchPeoplePage = (pageId = 1) => {
	return fetch(`${ApiHost}/people/?page=${pageId}`)
		.then(res => res.json())
		.catch(error => {
			console.error(error);
			const data = { results: [], count: 0 };
			return data;
		})
		.then(data => {
			const amountPerPage = 10;
			const amount = data.results.length;
			const base = (pageId - 1) * amountPerPage;
			const hash = data.results.reduce((acc, personData) => {
				const person = formatFetchedPerson(personData);
				acc[person.id] = person;
				return acc;
			}, {});
			return {
				hash,
				totalAmount: data.count,
				from: base + 1,
				to: base + amount,
			};
		});
};

export const fetchAllPeople = () => {
	return fetchPeoplePage()
		.then(data => {
			const itemsPerPage = Object.keys(data.hash).length;
			const pagesAmount = Math.ceil(data.totalAmount / itemsPerPage);
			const requests = Array(pagesAmount)
				.fill(1)
				.map((_, idx) => {
					const pageId = idx + 1;
					if (pageId === 1) return Promise.resolve(data.hash); // Already fetched
					return fetchPeoplePage(pageId);
				});
			return Promise.all(requests);
		})
		.then(data => {
			return data.reduce((acc, result) => {
				return { ...acc, ...result.hash };
			});
		})
		.then(data => {
			// if (isDev) console.log(data);
			return data;
		});
};

export const fetchPlanet = planetId => {
	return fetch(`${ApiHost}/planets/${planetId}/`)
		.then(res => res.json())
		.catch(error => {
			console.error(error);
			return {};
		})
		.then(planetData => {
			planetData.id = getIdFromURL(planetData.url);
			planetData.residents = planetData.residents.map(getIdFromURL);
			if (isDev) {
				console.log('Fetched planet:');
				console.log(planetData);
			}
			return planetData;
		});
};
