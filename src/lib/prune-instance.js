import isObjectWithKeys from './is-object-with-keys.js';
import { FORM_CONCEALED_KEYS } from '../utils/constants.js';

const pruneInstance = (instance, recursions = 0) => {

	return Object.keys(instance).reduce((accumulator, key) => {

		if (recursions === 0 && key === 'model') {

			accumulator[key] = instance[key];

			return accumulator;

		}

		if (FORM_CONCEALED_KEYS.has(key)) return accumulator;

		if (isObjectWithKeys(instance[key])) {

			accumulator[key] = pruneInstance(instance[key], recursions + 1);

		} else if (Array.isArray(instance[key])) {

			accumulator[key] =
				instance[key]
					.filter((item, index) =>
						index === 0 || !Object.hasOwn(item, 'name') || Boolean(item.name)
					)
					.filter((item, index) =>
						index === 0 || !Object.hasOwn(item, 'uuid') || Boolean(item.uuid)
					)
					.map(item => isObjectWithKeys(item) ? pruneInstance(item, recursions + 1) : item);

		} else {

			accumulator[key] = instance[key];

		}

		return accumulator;

	}, {});

};

export default pruneInstance;
