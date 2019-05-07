import isObject from './is-object';

const wipeObjectBlank = object => {

	Object.entries(object).forEach(([prop, value]) => {

		if (isObject(value)) {

			object[prop] = wipeObjectBlank(value);

		} else if (Array.isArray(value)) {

			object[prop] = [wipeObjectBlank(value[0])];

		} else {

			object[prop] = '';

		}

	});

	return object;

};

export default object => wipeObjectBlank(object);
