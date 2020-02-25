export const sortItemsByProp = (items, sortParams) => {
	const propName = Object.keys(sortParams)[0];
	const direction = sortParams[propName];
	return items.slice().sort((a, b) => {
		if (b[propName] === undefined || a[propName] > b[propName]) return direction;
		if (a[propName] === undefined || a[propName] < b[propName]) return -direction;
		return 0;
	});
};

export const defaultSorter = (a, b, direction = 1) => {
	if (a > b) return direction;
	if (a < b) return -direction;
	return 0;
};
