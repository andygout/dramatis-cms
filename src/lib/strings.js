import { IRREGULAR_PLURAL_NOUNS_MAP } from '../utils/constants';

const camelCaseToSentenceCase = camelCasedText =>
	camelCasedText
		.replace(/([A-Z])/g, match => ` ${match.toLowerCase()}`)
		.replace(/^./, match => match.toUpperCase());

const capitalise = string => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

const pluralise = model => IRREGULAR_PLURAL_NOUNS_MAP[model] || `${model}s`;

export {
	camelCaseToSentenceCase,
	capitalise,
	pluralise
};
