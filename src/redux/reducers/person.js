import { Map, fromJS } from 'immutable';

import {
	REQUEST_PERSON,
	RECEIVE_PERSON,
	RECEIVE_PERSON_CREATE,
	RECEIVE_PERSON_UPDATE
} from '../utils/model-actions';

const person = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PERSON:
		case RECEIVE_PERSON_CREATE:
		case RECEIVE_PERSON_UPDATE:
			return fromJS(action.payload);

		case REQUEST_PERSON:
		default:
			return state;

	}

};

export default person;
