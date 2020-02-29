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
