import { Map, OrderedMap } from 'immutable';

import {
	REQUEST_CHARACTER,
	RECEIVE_CHARACTER,
	REQUEST_CHARACTER_CREATE,
	RECEIVE_CHARACTER_CREATE,
	REQUEST_CHARACTER_UPDATE,
	RECEIVE_CHARACTER_UPDATE,
	REQUEST_CHARACTER_DELETE,
	RECEIVE_CHARACTER_DELETE
} from '../utils/model-action-names';

const character = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_CHARACTER:
		case RECEIVE_CHARACTER_CREATE:
		case RECEIVE_CHARACTER_UPDATE:
		case RECEIVE_CHARACTER_DELETE:
			return OrderedMap(action.payload);

		case REQUEST_CHARACTER:
		case REQUEST_CHARACTER_CREATE:
		case REQUEST_CHARACTER_UPDATE:
		case REQUEST_CHARACTER_DELETE:
		default:
			return state;

	}

};

export default character;
