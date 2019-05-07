import isObject from './is-object';

const isNonEmptyString = value => typeof value === 'string' && value.length;

const isObjectWithNonEmptyString = value => isObject(value) && searchForNonEmptyString(value);

const searchForNonEmptyString = object => {

	for (const prop in object) if (object.hasOwnProperty(prop)) {

		const value = object[prop];

		if (isNonEmptyString(value)) return true;

		if (isObjectWithNonEmptyString(value)) return true;

		if (Array.isArray(value) && value.find(item => isObjectWithNonEmptyString(item))) return true;

	}

	return false;

};

export default object => searchForNonEmptyString(object);
