import { Map, fromJS } from 'immutable';

import {
	REQUEST_THEATRE,
	RECEIVE_THEATRE,
	REQUEST_THEATRE_CREATE,
	RECEIVE_THEATRE_CREATE,
	REQUEST_THEATRE_UPDATE,
	RECEIVE_THEATRE_UPDATE,
	REQUEST_THEATRE_DELETE,
	RECEIVE_THEATRE_DELETE
} from '../utils/model-actions';

const theatre = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_THEATRE:
		case RECEIVE_THEATRE_CREATE:
		case RECEIVE_THEATRE_UPDATE:
		case RECEIVE_THEATRE_DELETE:
			return fromJS(action.payload);

		case REQUEST_THEATRE:
		case REQUEST_THEATRE_CREATE:
		case REQUEST_THEATRE_UPDATE:
		case REQUEST_THEATRE_DELETE:
		default:
			return state;

	}

};

export default theatre;
