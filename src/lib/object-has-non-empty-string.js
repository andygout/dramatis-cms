import isObjectWithKeys from './is-object-with-keys.js';
import { FORM_UNEDITABLE_KEYS } from '../utils/constants.js';

const isNonEmptyString = value => typeof value === 'string' && Boolean(value);

const isObjectWithNonEmptyString = value => isObjectWithKeys(value) && searchForNonEmptyString(value);

const searchForNonEmptyString = object => {

	const objectToSearch = {};

	Object.entries(object).forEach(([key, value]) => {

		if (!FORM_UNEDITABLE_KEYS.has(key)) objectToSearch[key] = value;

	});

	for (let value of Object.values(objectToSearch)) {

		if (isNonEmptyString(value)) return true;

		if (isObjectWithNonEmptyString(value)) return true;

		if (Array.isArray(value) && value.find(item => isObjectWithNonEmptyString(item))) return true;

	}

	return false;

};

export default searchForNonEmptyString;
