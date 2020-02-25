const isValueValid = value => value && value !== 'n/a' && value !== 'unknown' && value !== 'none';

export const getInitFilterParams = filterProps =>
	filterProps.reduce((acc, key) => {
		acc[key] = null;
		return acc;
	}, {});

export const filterItemsHash = (hash, filterParams) => {
	return Object.values(hash).reduce((acc, item) => {
		const notPassedFilterParam = Object.keys(filterParams).find(propName => {
			if (filterParams[propName] === null) return false;
			const filteredOptions = filterParams[propName];
			const matchingValue = item[propName].split(', ').find(itemValue => isValueValid(itemValue) && filteredOptions[itemValue]);
			return !matchingValue;
		});
		if (!notPassedFilterParam) acc[item.id] = item;
		return acc;
	}, {});
};

export const collectFilterOptions = (itemsHash, filterParams) => {
	const filterProps = Object.keys(filterParams);
	const addOption = (acc, propName, itemValue) => {
		if (isValueValid(itemValue)) acc[propName][itemValue] = true;
	};

	return Object.values(itemsHash).reduce((acc, item) => {
		filterProps.forEach(propName => {
			if (!acc[propName]) acc[propName] = {};
			item[propName].split(', ').forEach(itemValue => {
				addOption(acc, propName, itemValue);
			});
		});
		return acc;
	}, {});
};
