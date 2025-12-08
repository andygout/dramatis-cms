import isObjectWithKeys from './is-object-with-keys.js';
import { FORM_UNEDITABLE_KEYS } from '../utils/constants.js';

const isNonEmptyString = value => typeof value === 'string' && Boolean(value);

const isObjectWithKeysAndNonEmptyString = value => isObjectWithKeys(value) && hasNonEmptyString(value);

const hasNonEmptyString = object => {

	const objectToSearch = {};

	Object.entries(object).forEach(([key, value]) => {

		if (!FORM_UNEDITABLE_KEYS.has(key)) objectToSearch[key] = value;

	});

	for (let value of Object.values(objectToSearch)) {

		if (isNonEmptyString(value)) return true;

		if (isObjectWithKeysAndNonEmptyString(value)) return true;

		if (Array.isArray(value) && value.find(item => isObjectWithKeysAndNonEmptyString(item))) return true;

	}

	return false;

};

export default hasNonEmptyString;
