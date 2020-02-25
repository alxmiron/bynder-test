import { ApiHost, isDev } from '../constants';

export const fetchPerson = personId => {
	return fetch(`${ApiHost}/people/${personId}/`)
		.then(res => res.json())
		.catch(error => {
			console.error(error);
			return {};
		})
		.then(data => {
			if (isDev) console.log(data);
			return data;
		});
};

export const fetchPeople = (pageId = 1) => {
	const numProps = ['height', 'mass'];
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
			const hash = data.results.reduce((acc, person, idx) => {
				const personId = `${base + idx + 1}`;
				acc[personId] = { ...person, id: personId };
				numProps.forEach(propName => {
					const parsed = parseInt(acc[personId][propName], 10);
					acc[personId][propName] = isNaN(parsed) ? undefined : parsed;
				});
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
	return fetchPeople()
		.then(data => {
			const itemsPerPage = Object.keys(data.hash).length;
			const pagesAmount = Math.ceil(data.totalAmount / itemsPerPage);
			const requests = Array(pagesAmount)
				.fill(1)
				.map((_, idx) => {
					const pageId = idx + 1;
					if (pageId === 1) return Promise.resolve(data.hash); // Already fetched
					return fetchPeople(pageId);
				});
			return Promise.all(requests);
		})
		.then(data => {
			return data.reduce((acc, result) => {
				return { ...acc, ...result.hash };
			});
		})
		.then(data => {
			if (isDev) console.log(data);
			return data;
		});
};
