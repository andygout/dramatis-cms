import { isObjectWithKeys } from './is-object-with-keys';
import { FORM_CONCEALED_KEYS } from '../utils/constants';

const pruneInstance = (instance, recursions = 0) => {

	return Object.keys(instance).reduce((accumulator, key) => {

		if (recursions === 0 && key === 'model') {

			accumulator[key] = instance[key];

			return accumulator;

		}

		if (FORM_CONCEALED_KEYS.includes(key)) return accumulator;

		if (isObjectWithKeys(instance[key])) {

			accumulator[key] = pruneInstance(instance[key], recursions + 1);

		} else if (Array.isArray(instance[key])) {

			accumulator[key] =
				instance[key]
					.filter((item, index) => index === 0 || !!item.name.length)
					.map(item => isObjectWithKeys(item) ? pruneInstance(item, recursions + 1) : item);

		} else {

			accumulator[key] = instance[key];

		}

		return accumulator;

	}, {});

};

export default pruneInstance;
