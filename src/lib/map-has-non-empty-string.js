import { List, Map } from 'immutable';

const isNonEmptyString = value => typeof value === 'string' && value.length;

const isMapWithNonEmptyString = value => Map.isMap(value) && searchForNonEmptyString(value);

const searchForNonEmptyString = map => {

	for (let value of map.valueSeq()) {

		if (isNonEmptyString(value)) return true;

		if (isMapWithNonEmptyString(value)) return true;

		if (List.isList(value) && value.find(item => isMapWithNonEmptyString(item))) return true;

	}

	return false;

};

export default map => searchForNonEmptyString(map);
