import { IRREGULAR_PLURAL_NOUNS } from '../utils/constants';

const capitalise = (string) => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

const pluralise = model => {

	return IRREGULAR_PLURAL_NOUNS[model] || `${model}s`;

}

export {
	capitalise,
	pluralise
};
