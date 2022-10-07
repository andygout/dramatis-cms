const getIn = (object, path) => path.reduce((accumulator, key) => accumulator[key], object);

const removeIn = (object, path) => {

	const objectClone = structuredClone(object);

	path.reduce((accumulator, key, index) => {

		if (index === path.length - 1) accumulator.splice(key, 1);

		return accumulator[key];

	}, objectClone);

	return objectClone;

};

const setIn = (object, path, revisionValue) => {

	if (path.length === 0) return revisionValue;

	const objectClone = structuredClone(object);

	path.reduce((accumulator, key, index) => {

		if (index === path.length - 1) accumulator[key] = revisionValue;

		return accumulator[key];

	}, objectClone);

	return objectClone;

};

const pushIn = (object, path, additionalArrayItem) => {

	const objectClone = structuredClone(object);

	if (path.length === 0) {

		objectClone.push(additionalArrayItem);

	} else {

		path.reduce((accumulator, key, index) => {

			if (index === path.length - 1) accumulator[key].push(additionalArrayItem);

			return accumulator[key];

		}, objectClone);

	}

	return objectClone;

};

export {
	getIn,
	removeIn,
	setIn,
	pushIn
};
