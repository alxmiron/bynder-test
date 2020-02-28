export const mergeTwoHashes = (currHash, newHash, persistProps) => {
	return Object.keys(newHash).reduce((acc, key) => {
		acc[key] = { ...newHash[key] };
		if (currHash[key]) {
			persistProps.forEach(propName => {
				acc[key][propName] = currHash[key][propName];
			});
		}
		return acc;
	}, {});
};

export const formatNumericObjectProps = (obj, numericProps) => {
	return Object.keys(obj).reduce((acc, propName) => {
		if (numericProps.includes(propName)) {
			const parsed = parseInt(obj[propName], 10);
			acc[propName] = isNaN(parsed) ? undefined : parsed;
		} else {
			acc[propName] = obj[propName];
		}
		return acc;
	}, {});
};
