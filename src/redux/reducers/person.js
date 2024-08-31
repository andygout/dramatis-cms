import {
	REQUEST_PERSON,
	RECEIVE_PERSON,
	REQUEST_PERSON_CREATE,
	RECEIVE_PERSON_CREATE,
	REQUEST_PERSON_UPDATE,
	RECEIVE_PERSON_UPDATE,
	REQUEST_PERSON_DELETE,
	RECEIVE_PERSON_DELETE
} from '../utils/model-action-names.js';

const person = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_PERSON:
		case RECEIVE_PERSON_CREATE:
		case RECEIVE_PERSON_UPDATE:
		case RECEIVE_PERSON_DELETE:
			return action.payload;

		case REQUEST_PERSON:
		case REQUEST_PERSON_CREATE:
		case REQUEST_PERSON_UPDATE:
		case REQUEST_PERSON_DELETE:
		default:
			return state;

	}

};

export default person;
