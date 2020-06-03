const capitalise = (string) => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

const pluralise = model => {

	const irregularPluralNouns = {
		'person': 'people'
	};

	return irregularPluralNouns[model] || `${model}s`;

}

export {
	capitalise,
	pluralise
};
