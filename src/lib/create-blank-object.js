import isObjectWithKeys from './is-object-with-keys';

const createBlankObject = object => {

	const blankObject = {};

	Object.entries(object).forEach(([key, value]) => {

		blankObject[key] = (() => {

			switch (true) {

				case key === 'errors':
					return {};

				case key === 'model':
					return value;

				case isObjectWithKeys(value):
					return createBlankObject(value);

				case Array.isArray(value):
					return [createBlankObject(value[0])];

				default:
					return '';

			}

		})();

	});

	return blankObject;

};

export default createBlankObject;
