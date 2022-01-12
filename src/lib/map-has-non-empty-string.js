import { List, Map } from 'immutable';

import { FORM_UNEDITABLE_KEYS } from '../utils/constants';

const isNonEmptyString = value => typeof value === 'string' && Boolean(value);

const isMapWithNonEmptyString = value => Map.isMap(value) && searchForNonEmptyString(value);

const searchForNonEmptyString = map => {

	const mapToSearch = map.deleteAll(FORM_UNEDITABLE_KEYS);

	for (let value of mapToSearch.valueSeq()) {

		if (isNonEmptyString(value)) return true;

		if (isMapWithNonEmptyString(value)) return true;

		if (List.isList(value) && value.find(item => isMapWithNonEmptyString(item))) return true;

	}

	return false;

};

export default searchForNonEmptyString;
