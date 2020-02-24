import { ApiHost, isDev } from '../constants';

export const fetchPeople = (pageId = 1) => {
	return fetch(`${ApiHost}/people/?page=${pageId}`)
		.then(res => res.json())
		.then(data => {
			const amount = data.results.length;
			const base = (pageId - 1) * amount;
			const hash = data.results.reduce((acc, person, idx) => {
				const personId = `${base + idx + 1}`;
				acc[personId] = { ...person, id: personId };
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
			const pagesAmount = Math.floor(data.totalAmount / itemsPerPage);
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
