import { Map, fromJS } from 'immutable';

import {
	REQUEST_PERSON,
	RECEIVE_PERSON,
	REQUEST_PERSON_CREATE,
	RECEIVE_PERSON_CREATE,
	REQUEST_PERSON_UPDATE,
	RECEIVE_PERSON_UPDATE,
	REQUEST_PERSON_DELETE,
	RECEIVE_PERSON_DELETE
} from '../utils/model-action-names';

const person = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PERSON:
		case RECEIVE_PERSON_CREATE:
		case RECEIVE_PERSON_UPDATE:
		case RECEIVE_PERSON_DELETE:
			return fromJS(action.payload);

		case REQUEST_PERSON:
		case REQUEST_PERSON_CREATE:
		case REQUEST_PERSON_UPDATE:
		case REQUEST_PERSON_DELETE:
		default:
			return state;

	}

};

export default person;
