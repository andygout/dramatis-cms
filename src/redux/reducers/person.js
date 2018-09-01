import {
	REQUEST_PERSON,
	RECEIVE_PERSON,
	RECEIVE_PERSON_UPDATE
} from '../utils/model-actions';

const person = (state = {}, action) => {

	switch (action.type) {

		case REQUEST_PERSON:
			return state;

		case RECEIVE_PERSON:
			return action.payload;

		case RECEIVE_PERSON_UPDATE:
			return action.payload;

		default:
			return state;

	}

};

export default person;
